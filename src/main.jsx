import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider, alpha, } from '@mui/material/styles';
import { purple, indigo, } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { schemeBuPu, } from 'd3-scale-chromatic';

import App from './App.jsx';

import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow-semi-condensed/400.css';
import '@fontsource/barlow-semi-condensed/600.css';
import '@fontsource/barlow-semi-condensed/700.css';

import 'leaflet/dist/leaflet.css';

const rootElement = document.getElementById('root');

const scheme = schemeBuPu;
// const hilite = palette[3];

const theme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            }
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            }
        },
        MuiLink: {
            defaultProps: {
                fontWeight: 600,
                color: 'secondary',
            },
        },
        MuiAccordionSummary: {
            variants: [
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: alpha(indigo[50], 0.8),
                    }
                }
            ]
        }
    },
    typography: {
        fontFamily: 'Barlow, sans-serif',
        fontWeightBold: 600,
        h1: {
            fontWeight: 500,
            fontSize: '2rem',
            marginTop: '1rem',
            marginBottom: '1rem',
        },
        h2: {
            fontWeight: 500,
            fontSize: '1.2rem',
        },
        h3: {
            fontWeight: 500,
            fontSize: '1.1rem',
        },
        h4: {
            fontWeight: 500,
            fontSize: '1.05rem',
        },
        body1: {
            marginBottom: '0.5rem',
        },
        caption: {
            lineHeight: 1.25,
            marginTop: '0.2rem',
        }
    },
    palette: {
        // primary: {
        //     main: purple,
        // },
        // secondary: {
        //     main: secondary,
        // },
        primary: purple,
        secondary: {
            main: indigo['A400'],
            light: indigo[400],
            dark: indigo[800],
            muted: '#6e7397',
            lightest: indigo[50],
        },
        background: {
            default: '#fcfcfc',
        },
    }
});

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App scheme={scheme} />
        </ThemeProvider>
    </React.StrictMode>
);