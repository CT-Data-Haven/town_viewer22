import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Panel from '../Layout/Panel/Panel';

const Profile = ({ topic, location, data }) => (
    <Panel
        heading={`${topic} at a glance: ${location}`}
        hLevels={['h2']}
    >
        <TableContainer sx={{ mb: 1 }}>
            <Table size='small' aria-label='Neighborhood profile table'>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell sx={{
                                fontWeight: 'medium'
                            }}>{row.indicator}</TableCell>
                            <TableCell
                                align='right'
                            >{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Panel>
);

Profile.propTypes = {
    topic: PropTypes.string,
    location: PropTypes.string,
    data: PropTypes.array,
};

export default Profile;
