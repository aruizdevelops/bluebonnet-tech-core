const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        padding: '10px 24px',
        fontSize: '0.9rem',
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #6C63FF 0%, #8B83FF 100%)',
        boxShadow: '0 4px 20px rgba(108, 99, 255, 0.3)',
        '&:hover': {
          background: 'linear-gradient(135deg, #5A52E0 0%, #7A73F0 100%)',
          boxShadow: '0 6px 28px rgba(108, 99, 255, 0.45)',
        },
      },
      containedSecondary: {
        background: 'linear-gradient(135deg, #00E5A0 0%, #00B27C 100%)',
        boxShadow: '0 4px 20px rgba(0, 229, 160, 0.3)',
        '&:hover': {
          background: 'linear-gradient(135deg, #00CC8E 0%, #009A6C 100%)',
          boxShadow: '0 6px 28px rgba(0, 229, 160, 0.45)',
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        backgroundImage: 'none',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 600,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 8,
        fontSize: '0.8rem',
      },
    },
  },
};

export default components;
