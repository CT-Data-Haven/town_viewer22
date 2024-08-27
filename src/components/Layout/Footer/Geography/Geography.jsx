import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import FooterRow from '../FooterRow/FooterRow';

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

export default Geography;