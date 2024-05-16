import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

const Row = ({ children, xs, md }) => (
    <Grid container>
        {children.map((child, i) => (
            <Grid item key={i} xs={xs[+i] || xs} md={md[+i] || md}>
                {child}
            </Grid>
        ))}
    </Grid>
);

Row.propTypes = {
    children: PropTypes.array,
    xs: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]),
    md: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]),
};

export default Row;