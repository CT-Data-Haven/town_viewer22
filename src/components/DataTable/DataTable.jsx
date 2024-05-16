import PropTypes from 'prop-types';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Panel from '../Layout/Panel/Panel';

const Toolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
};

const DataTable = ({
    topic,
    location,
    data,
    paginationModel,
    pageChangeHandler,
    locationChangeHandler,
}) => {
    const { columns, rows } = data;
    return (
        <Panel heading={`${topic} by location`}>
            <div className='GridContainer' style={{ height: 540, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={pageChangeHandler}
                    onRowSelectionModelChange={(loc) => {
                        if (loc.length) {
                            locationChangeHandler(loc[0]);
                        }
                    }}
                    // make sure only single row selected
                    rowSelectionModel={location ? [location] : []}
                    density='compact'
                    sx={{
                        fontSize: '0.8rem',
                        // individual header text
                        '& .MuiDataGrid-columnHeaderTitle': {
                            whiteSpace: 'normal',
                            lineHeight: '1.1em',
                            py: '0.3rem',
                            // overflow: 'visible',
                        },
                        // individual header
                        '& .MuiDataGrid-columnHeader': {
                            height: 'unset !important',
                            alignSelf: 'end',
                        },
                        // collection of headers
                        '& .MuiDataGrid-columnHeaders': {
                            minHeight: '3.5rem',
                            maxHeight: '8rem !important',
                            justifyContent: 'flex-end',
                        },
                        // collection of this row of headers
                        '& .MuiDataGrid-columnHeaderRow': {
                            alignItems: 'flex-end',
                        },
                        '& .MuiDataGrid-topContainer': {
                            backgroundColor: 'var(--DataGrid-containerBackground)'

                        }
                    }}
                    // hide level column
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                level: false,
                                cog: false,
                            }
                        }
                    }}
                    // autosize widths
                    autosizeOptions={{ expand: true, includeHeaders: true }}
                    slots={{
                        toolbar: Toolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            printOptions: {
                                disableToolbarButton: true
                            }
                        }
                    }}
                    // autoHeight
                    autosizeOnMount
                    // disableColumnSelector
                    hideFooterSelectedRowCount
                    keepNonExistentRowsSelected
                    disableColumnMenu
                    disableDensitySelector
                    disableMultipleRowSelection
                />
            </div>
        </Panel>
    )
};

DataTable.propTypes = {
    topic: PropTypes.string.isRequired,
    location: PropTypes.string,
    data: PropTypes.object.isRequired,
    paginationModel: PropTypes.object,
    pageChangeHandler: PropTypes.func,
    locationChangeHandler: PropTypes.func,
};

export default DataTable;
