import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export default FooterRow;