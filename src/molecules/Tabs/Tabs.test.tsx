import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Tabs, TabList, Tab, TabPanel } from './Tabs'

const Default = ({ defaultValue = 'a' }: { defaultValue?: string }) => (
  <Tabs defaultValue={defaultValue}>
    <TabList>
      <Tab value="a">Tab A</Tab>
      <Tab value="b">Tab B</Tab>
      <Tab value="c">Tab C</Tab>
    </TabList>
    <TabPanel value="a">Panel A</TabPanel>
    <TabPanel value="b">Panel B</TabPanel>
    <TabPanel value="c">Panel C</TabPanel>
  </Tabs>
)

const WithDisabled = () => (
  <Tabs defaultValue="a">
    <TabList>
      <Tab value="a">Tab A</Tab>
      <Tab value="b" disabled>Tab B</Tab>
      <Tab value="c">Tab C</Tab>
    </TabList>
    <TabPanel value="a">Panel A</TabPanel>
    <TabPanel value="b">Panel B</TabPanel>
    <TabPanel value="c">Panel C</TabPanel>
  </Tabs>
)

// ── Renderização ──────────────────────────────────────────────────────────────

describe('Tabs — renderização', () => {
  it('renderiza TabList com tabs e painéis', () => {
    render(<Default />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getAllByRole('tabpanel')).toHaveLength(3)
  })

  it('apenas o painel da tab ativa é visível — restantes ficam hidden', () => {
    render(<Default defaultValue="a" />)
    const panelA = screen.getByRole('tabpanel', { hidden: false, name: /Tab A/i })
    expect(panelA).not.toHaveClass('hidden')

    const allPanels = screen.getAllByRole('tabpanel', { hidden: true })
    const hiddenPanels = allPanels.filter(p => p.classList.contains('hidden'))
    expect(hiddenPanels).toHaveLength(2)
  })
})

// ── Interação por clique ───────────────────────────────────────────────────────

describe('Tabs — clique', () => {
  it('clique em tab inativa muda painel ativo', () => {
    render(<Default />)
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
    expect(screen.getByText('Panel B').closest('[role="tabpanel"]')).not.toHaveClass('hidden')
    expect(screen.getByText('Panel A').closest('[role="tabpanel"]')).toHaveClass('hidden')
  })

  it('tab desabilitada não é ativada por clique', () => {
    render(<WithDisabled />)
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
    expect(screen.getByText('Panel A').closest('[role="tabpanel"]')).not.toHaveClass('hidden')
    expect(screen.getByText('Panel B').closest('[role="tabpanel"]')).toHaveClass('hidden')
  })
})

// ── Teclado ───────────────────────────────────────────────────────────────────

describe('Tabs — teclado', () => {
  it('ArrowRight avança para a próxima tab e a ativa', () => {
    render(<Default />)
    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    fireEvent.keyDown(tabA, { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveFocus()
    expect(screen.getByText('Panel B').closest('[role="tabpanel"]')).not.toHaveClass('hidden')
  })

  it('ArrowLeft volta para a tab anterior e a ativa', () => {
    render(<Default defaultValue="b" />)
    const tabB = screen.getByRole('tab', { name: 'Tab B' })
    fireEvent.keyDown(tabB, { key: 'ArrowLeft' })
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveFocus()
    expect(screen.getByText('Panel A').closest('[role="tabpanel"]')).not.toHaveClass('hidden')
  })

  it('ArrowRight faz wrap-around da última para a primeira tab', () => {
    render(<Default defaultValue="c" />)
    const tabC = screen.getByRole('tab', { name: 'Tab C' })
    fireEvent.keyDown(tabC, { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveFocus()
  })

  it('Home move foco para a primeira tab', () => {
    render(<Default defaultValue="c" />)
    const tabC = screen.getByRole('tab', { name: 'Tab C' })
    fireEvent.keyDown(tabC, { key: 'Home' })
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveFocus()
  })

  it('End move foco para a última tab', () => {
    render(<Default />)
    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    fireEvent.keyDown(tabA, { key: 'End' })
    expect(screen.getByRole('tab', { name: 'Tab C' })).toHaveFocus()
  })

  it('ArrowRight pula tab desabilitada', () => {
    render(<WithDisabled />)
    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    fireEvent.keyDown(tabA, { key: 'ArrowRight' })
    // Tab B é disabled — deve pular para Tab C
    expect(screen.getByRole('tab', { name: 'Tab C' })).toHaveFocus()
  })
})

// ── ARIA ──────────────────────────────────────────────────────────────────────

describe('Tabs — ARIA', () => {
  it('tab ativa tem aria-selected="true"', () => {
    render(<Default defaultValue="a" />)
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute('aria-selected', 'true')
  })

  it('tab inativa tem aria-selected="false"', () => {
    render(<Default defaultValue="a" />)
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute('aria-selected', 'false')
  })

  it('painel tem aria-labelledby apontando para id da tab correspondente', () => {
    render(<Default defaultValue="a" />)
    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    const tabId = tabA.id
    const panel = screen.getByText('Panel A').closest('[role="tabpanel"]')
    expect(panel).toHaveAttribute('aria-labelledby', tabId)
  })
})

// ── Controlado ────────────────────────────────────────────────────────────────

describe('Tabs — controlado', () => {
  it('onChange é chamado com o value correto ao clicar em tab', () => {
    const onChange = vi.fn()
    render(
      <Tabs value="a" onChange={onChange}>
        <TabList>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('modo controlado sem onChange mantém painel fixo ao clicar', () => {
    render(
      <Tabs value="a">
        <TabList>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )
    fireEvent.click(screen.getByRole('tab', { name: 'Tab B' }))
    // sem onChange, value "a" permanece ativo
    expect(screen.getByText('Panel A').closest('[role="tabpanel"]')).not.toHaveClass('hidden')
    expect(screen.getByText('Panel B').closest('[role="tabpanel"]')).toHaveClass('hidden')
  })
})

// ── Variantes ─────────────────────────────────────────────────────────────────

describe('Tabs — variantes', () => {
  it('variante pill aplica bg-primary-50 na tab ativa', () => {
    render(
      <Tabs defaultValue="a" variant="pill">
        <TabList>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveClass('bg-primary-50')
  })

  it('variante card aplica bg-white e shadow-sm na tab ativa', () => {
    render(
      <Tabs defaultValue="a" variant="card">
        <TabList>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    )
    const tabA = screen.getByRole('tab', { name: 'Tab A' })
    expect(tabA).toHaveClass('bg-white')
    expect(tabA).toHaveClass('shadow-sm')
  })
})
