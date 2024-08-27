import PropTypes from 'prop-types';
import Panel from '../Panel/Panel';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Download from './Download/Download';
import Geography from './Geography/Geography';
import Sources from './Sources/Sources';
import Dictionary from './Dictionary/Dictionary';

const Footer = ({
    dwBase,
    ghBase,
    csvFn,
    dwSlug,
    towns,
    cog,
    sources,
    dictionary,
    format,
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

            <Dictionary definitions={dictionary} format={format} />
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
    format: PropTypes.func,
};

export default Footer;
