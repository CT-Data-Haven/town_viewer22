import PropTypes from 'prop-types';
import Panel from '../Panel/Panel';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const FooterRow = ({ heading, children }) => (
    <Box>
        <Typography variant='h3'>{heading}</Typography>
        {children}
    </Box>
);

FooterRow.propTypes = {
    heading: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

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

const Geography = ({ towns, cog }) => (
    <FooterRow heading='Geography'>
        <Typography>
            Note that for small towns, data from the DataHaven Community Wellbeing Survey may be unavailable.
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
        <strong>{`${source} `}</strong>
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

const Footer = ({
    dwBase,
    ghBase,
    csvFn,
    dwSlug,
    towns,
    cog,
    sources
}) => (
    <Panel heading={`Notes`}>
        <Stack
            direction='column'
            spacing={1}
            divider={<Divider aria-hidden='true' variant='middle' />}
            sx={{
                m: 1,
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
};

export default Footer;
