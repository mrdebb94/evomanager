import * as React from 'react';

import  Button  from '@material-ui/core/Button';
import { Link, RouteComponentProps } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import * as ProjectDetailsStore from '../store/ProjectDetails';
import { ApplicationState } from '../store';

import ProjectMeetingDialog from './ProjectMeetingDialog'

type ProjectDetailsProps =
    ProjectDetailsStore.ProjectDetailsState
    & typeof  ProjectDetailsStore.actionCreators
    & RouteComponentProps<{}>

class ProjectMeetingsList extends React.Component<ProjectDetailsProps,any> {
	
   componentDidMount() {
        this.props.setProjectMeetingList();
   }
	
   render() {
	   return (<div>
	   <ProjectMeetingDialog />
	    <Toolbar>
       
                 <Button  color="primary" onClick={() => {
                      this.props.toggleProjectMeetingDialog(true, "edit");
                   }}>
                   Módosítás
                   </Button>
                  <Button color="primary" onClick={() => {
                      this.props.toggleProjectMeetingDialog(true, "create");
                   }} >
                   Új megbeszélés
                   </Button>
                
         </Toolbar>
	    <Table>
            <TableHead>
                <TableRow>
                     <TableCell>Kezdés</TableCell>
                     <TableCell>Végzés</TableCell>
                     <TableCell>Státusz</TableCell>
                 </TableRow>
             </TableHead>
             <TableBody>
			   {
				   this.props.projectMeetingList.map((projectMeeting, i) => (
				       <TableRow key={projectMeeting.projectMeetingId!}>
					      <TableCell>{projectMeeting.startTime!.format("YYYY-MM-DD HH:mm")}</TableCell>
						  <TableCell>{projectMeeting.endTime!.format("YYYY-MM-DD HH:mm")}</TableCell>
						  <TableCell> {/*
                              <FlatButton label="Lebonyolítás" primary={true} onClick={() => {
                              }}/> */}
                              <Link to={`/projectmeetings/details/${projectMeeting.projectMeetingId!}`}>
                                 <Button 
                                   color="primary">
                                 Lebonyolítás
                                 </Button>
                              </Link>
                            </TableCell>
					   </TableRow>
				   ))
			   }
		     </TableBody>
		</Table>
		</div>
	   )
   }   
}

export default connect(
    (state: ApplicationState) => state.projectDetails,
    ProjectDetailsStore.actionCreators)
    (ProjectMeetingsList);