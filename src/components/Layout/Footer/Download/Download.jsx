import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FooterRow from '../FooterRow/FooterRow';

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

export default Download;