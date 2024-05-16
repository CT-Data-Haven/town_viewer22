import PropTypes from 'prop-types';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PanelHeading = ({ text, level }) => (
    <Typography
        variant={level}
        sx={{
            m: 1,
        }}
    >
        {text}
    </Typography>
);

PanelHeading.propTypes = {
    text: PropTypes.string,
    level: PropTypes.string,
};

const PanelFooter = ({ text }) => (
    <Typography
        variant='caption'
        as='div'
    >
        {text}
    </Typography>
);

PanelFooter.propTypes = {
    text: PropTypes.string,
};

const Panel = ({
    headings,
    heading,
    hLevels,
    hLevel,
    footer,
    sx,
    children,
}) => {
    const hdngs = headings || (heading ? [heading] : []); // Add null check and initialize as empty array
    const levels = hLevels || (hLevel ? [hLevel] : ['h2']);

    const headingElems = hdngs.map((heading, i) => (
        <PanelHeading
            key={i}
            text={heading}
            level={levels[i]}
        />
    ));

    const footerElem = footer && (
        <PanelFooter
            text={footer}
        />
    );
    return (
        <Paper
            variant='outlined'
            sx={{
                p: 1,
                m: 1,
                ...sx
            }}
        >
            {headingElems}

            {children}

            {footerElem}
        </Paper>
    )
};

Panel.propTypes = {
    headings: PropTypes.arrayOf(PropTypes.string),
    heading: PropTypes.string,
    hLevels: PropTypes.arrayOf(PropTypes.string),
    hLevel: PropTypes.string,
    footer: PropTypes.string,
    sx: PropTypes.object,
    children: PropTypes.node,
};

export default Panel;
