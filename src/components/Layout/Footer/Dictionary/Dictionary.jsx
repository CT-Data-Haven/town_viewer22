import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import FooterRow from '../FooterRow/FooterRow';

const Dictionary = ({ definitions, format, }) => (
    <FooterRow heading='Definitions of terms'>
        {definitions.map((section, i) => (
            <DictionarySection key={`def-section-${i}`} 
                format={format} 
                {...section} 
                i={i} 
            />
        ))}
    </FooterRow>
);

Dictionary.propTypes = {
    definitions: PropTypes.arrayOf(PropTypes.object).isRequired,
    format: PropTypes.func,
};

const DictionarySection = ({ source, format, variables, i, }) => (
    <Accordion
        disableGutters
        elevation={0}
    >
        <AccordionSummary
            aria-controls={`def-section-content-${i}`}
            id={`def-section-header-${i}`}
            expandIcon={<ExpandMoreIcon />}
            sx={{
                '& .MuiAccordionSummary-content': {
                    margin: '4px 0',
                },
            }}
            size='small'
            variant='filled'
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
                    <Definition format={format} key={`def-${j}`} {...def} />
                ))}
            </dl>
        </AccordionDetails>
    </Accordion>
);

DictionarySection.propTypes = {
    source: PropTypes.string.isRequired,
    variables: PropTypes.arrayOf(PropTypes.object).isRequired,
    i: PropTypes.number.isRequired,
    format: PropTypes.func,
};

const Definition = ({ term, definition, url, format }) => (
    <>
        <dt
            style={{
                fontWeight: '600',
            }}
        >
            {term}
        </dt>
        <dd>
            {format(definition)}
            {url && (
                <Link href={url}> Learn more here.</Link>
            )}
        </dd>
    </>
);

Definition.propTypes = {
    term: PropTypes.string.isRequired,
    definition: PropTypes.string,
    url: PropTypes.string,
    format: PropTypes.func,
};

export default Dictionary;