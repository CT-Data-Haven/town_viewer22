import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const Header = ({ heading }) => (
    <Box sx={{ p: 1 }}>
        <Typography variant='h1'>{heading}</Typography>
        <Alert severity='info' icon={false}>
            Select a topic and indicator to view the map. Clicking a location on the map, chart, or table, or selecting it in the location menu, will bring up detailed information on that area. See all towns and Councils of Government (COGs) in the table below, or download data at bottom.
        </Alert>
    </Box>
);

Header.propTypes = {
    heading: PropTypes.string,
};

export default Header;
