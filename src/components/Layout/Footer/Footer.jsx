import PropTypes from 'prop-types';
import Panel from '../Panel/Panel';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/*****************
 * // FOOTER ROW *
 *****************/
const FooterRow = ({ heading, children }) => (
    <Box>
        <Typography
            variant='h3'
            gutterBottom
        >{heading}</Typography>
        {children}
    </Box>
);

FooterRow.propTypes = {
    heading: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

/***************
 * // DOWNLOAD *
 ***************/
const Download = ({ dwBase, dwSlug, ghBase, csvFn }) => {
    const dlLink = <Link href={`https://query.data.world/s/${dwSlug}`}>Download</Link>;
    const dwLink = <Link href={dwBase}>data.world</Link>;
    const ghLink = <Link href={`${ghBase}/${csvFn}`}>GitHub</Link>;
    return (
        <FooterRow heading='Download data'>
            <Typography>
                {dlLink} data for all towns and COGs (.csv file),
                filter and analyze data online on {dwLink} (requires free sign-up),
                or download / clone from {ghLink} (advanced users).
            </Typography>
        </FooterRow>
    );
};

Download.propTypes = {
    dwBase: PropTypes.string.isRequired,
    dwSlug: PropTypes.string.isRequired,
    ghBase: PropTypes.string.isRequired,
    csvFn: PropTypes.string.isRequired,
};

/****************
 * // GEOGRAPHY *
 ****************/
const Geography = ({ towns, cog }) => (
    <FooterRow heading='Geography'>
        <Typography>
            Note that in order to include Community Wellbeing Survey results for small towns, values shown here are based on a model that incorporates direct measurements. Contact DataHaven for more information about the methodology used.
        </Typography>
        {towns && <Typography>
            {`${cog} is made up of the towns of ${towns}.`}
        </Typography>}
    </FooterRow>
);

Geography.propTypes = {
    towns: PropTypes.string,
    cog: PropTypes.string,
};

/**************
 * // SOURCES *
 **************/
const Sources = ({ sources }) => (
    <FooterRow heading='Source: DataHaven analysis (2024) of:'>
        <ul style={{ margin: 0 }}>
            {sources.map((source, i) => (
                <Source key={i} {...source} />
            ))}
        </ul>
    </FooterRow>
);

Sources.propTypes = {
    sources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Source = ({ project, source, url, year }) => (
    <li>
        <span style={{
            fontWeight: '600',
        }}>{`${source} `}</span>
        {`(${year}). `}
        <Link href={url}>{`${project}`}</Link>
    </li>
);

Source.propTypes = {
    project: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

/*****************
 * // DICTIONARY *
 *****************/
const Dictionary = ({ definitions }) => (
    <FooterRow heading='Definitions of terms'>
        {definitions.map((section, i) => (
            <DictionarySection key={i} {...section} i={i} />
        ))}
    </FooterRow>
);

Dictionary.propTypes = {
    definitions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const DictionarySection = ({ source, variables, i }) => (
    <Accordion
        disableGutters
        elevation={0}
    >
        <AccordionSummary
            aria-controls={`def-section-content-${i}`}
            id={`def-section-header-${i}`}
            expandIcon={<ExpandMoreIcon />}
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                '& .MuiAccordionSummary-content': {
                    margin: '4px 0',
                },
            }}
            size='small'
        >
            <Typography variant='h4'>{source}</Typography>
        </AccordionSummary>
        <AccordionDetails
            sx={{
                '& dl': {
                    margin: 0,
                }
            }}
        >
            <dl>
                {variables.map((def, j) => (
                    <Definition key={`def-${j}`} {...def} />
                ))}
            </dl>
        </AccordionDetails>
    </Accordion>
);

DictionarySection.propTypes = {
    source: PropTypes.string.isRequired,
    variables: PropTypes.arrayOf(PropTypes.object).isRequired,
    i: PropTypes.number.isRequired,
};

const Definition = ({ indicator, detail }) => (
    <>
        <dt
            style={{
                fontWeight: '600',
            }}
        >{indicator}</dt>
        <dd>{detail}</dd>
    </>
);

Definition.propTypes = {
    indicator: PropTypes.string.isRequired,
    detail: PropTypes.string,
};

/*************
 * // FOOTER *
 *************/
const Footer = ({
    dwBase,
    ghBase,
    csvFn,
    dwSlug,
    towns,
    cog,
    sources,
    dictionary,
}) => (
    <Panel heading={`Notes`}>
        <Stack
            direction='column'
            spacing={1}
            divider={<Divider aria-hidden='true' variant='middle' />}
            sx={{
                m: 1,
                '& p': {
                    lineHeight: 1.4,
                },
            }}
        >
            <Download
                dwBase={dwBase}
                ghBase={ghBase}
                csvFn={csvFn}
                dwSlug={dwSlug}
            />

            <Geography towns={towns} cog={cog} />

            <Sources sources={sources} />

            <Dictionary definitions={dictionary} />
        </Stack>
    </Panel>
);

Footer.propTypes = {
    dwBase: PropTypes.string.isRequired,
    ghBase: PropTypes.string.isRequired,
    csvFn: PropTypes.string.isRequired,
    dwSlug: PropTypes.string.isRequired,
    towns: PropTypes.string,
    cog: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.object).isRequired,
    dictionary: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Footer;
