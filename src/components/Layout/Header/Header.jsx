import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const InfoBox = ({ heading, children }) => (
    <Accordion
        disableGutters
        elevation={0}
        as={Alert}
        severity='info'
        icon={false}
        defaultExpanded
        sx={{
            fontSize: '0.95rem',
            mb: 2,
            '& ul': {
                paddingLeft: '1.2rem',
                m: 0,
            },
            '& .MuiAlert-message': {
                width: '100%',
            },
        }}
    >
        <AccordionSummary
            aria-controls='info-box-content'
            id='info-box-header'
            expandIcon={<ExpandMoreIcon />}
            sx={{
                '& .MuiAccordionSummary-content': {
                    margin: '4px 0',
                },
            }}
        >
            <Typography variant='h2'>
                <InfoOutlinedIcon
                    fontSize='medium'
                    color='info'
                    sx={{
                        verticalAlign: 'top',
                        marginRight: '0.5rem',
                    }}
                />
                {heading}
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
);

InfoBox.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
};

const Header = ({ heading, Logo, Markdown, logoColor }) => (
    <Box sx={{ 
        p: 0,
        mb: 2,
        mx: 1,
    }}>
        <AppBar
            position='static'
            color='transparent'
            elevation={0}
            sx={{
                mb: 2,
                '& .MuiToolbar-root': {
                    px: 0,
                }
            }}
        >
            <Toolbar>
                <Typography variant='h1'
                    sx={{
                        flexGrow: 1,
                    }}
                >{heading}</Typography>
                <Logo
                    style={{
                        height: '1.6rem',
                        width: 'auto',
                        flexShrink: 2,
                        fill: logoColor,
                    }}
                />
            </Toolbar>
        </AppBar>

        <InfoBox heading='Using this site'>
            <Markdown />
        </InfoBox>
    </Box>
);

Header.propTypes = {
    heading: PropTypes.string,
    Logo: PropTypes.elementType,
    Markdown: PropTypes.elementType,
    logoColor: PropTypes.string,
};

export default Header;
