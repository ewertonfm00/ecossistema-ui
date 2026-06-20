module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FDFA', 100: '#CCFBF1', 200: '#99F6E4',
          300: '#5EEAD4', 400: '#2DD4BF', 500: '#14B8A6',
          600: '#0D9488', 700: '#0F766E', 800: '#115E59',
          900: '#134E4A', 950: '#042F2E',
        },
        accent: {
          50: '#FFF1F2', 100: '#FFE4E6', 200: '#FECDD3',
          400: '#FB7185', 500: '#F43F5E', 600: '#E11D48',
          700: '#BE123C', 800: '#9F1239', 900: '#881337',
        },
        neutral: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0',
          300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B',
          600: '#475569', 700: '#334155', 800: '#1E293B',
          900: '#0F172A', 950: '#020617',
        },
        success: { 50: '#F0FDF4', 500: '#22C55E', 600: '#16A34A' },
        warning: { 50: '#FEFCE8', 500: '#EAB308', 600: '#CA8A04' },
        error:   { 50: '#FEF2F2', 500: '#EF4444', 600: '#DC2626' },
        info:    { 50: '#EFF6FF', 500: '#3B82F6' },
        module: {
          auth: '#475569', estetica: '#0D9488',
          marketing: '#7C3AED', gestao: '#D97706', ml: '#4338CA',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '5.625rem', fontWeight: '700' }],
        'display-xl':  ['3.75rem', { lineHeight: '4.5rem',   fontWeight: '700' }],
        'display-lg':  ['3rem',    { lineHeight: '3.75rem',  fontWeight: '700' }],
        'display-md':  ['2.25rem', { lineHeight: '2.75rem',  fontWeight: '600' }],
        'display-sm':  ['1.875rem',{ lineHeight: '2.375rem', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      boxShadow: {
        'elevation-xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        focus:          '0 0 0 3px rgb(13 148 136 / 0.25)',
        'focus-accent': '0 0 0 3px rgb(225 29 72 / 0.25)',
      },
      zIndex: {
        raised: '10', dropdown: '100', sticky: '200',
        overlay: '300', modal: '400', toast: '500', tooltip: '600',
      },
      transitionTimingFunction: {
        'entrance': 'cubic-bezier(0, 0, 0.2, 1)',
        'exit':     'cubic-bezier(0.4, 0, 1, 1)',
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
