import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Grid, Select, Paper, InputLabel, FormControl, MenuItem} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, } from '@material-ui/core/styles';
import AddSite from './Add';
import DynamicButton from '../../Buttons/DynamicButton';
import EditSite from './Edit';

const styles = theme => ({ 
  paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '350px',
  },
  grow:{
      flexGrow: 1
  },
  hrWordDivder: {
    width: '90%',
    textAlign: 'center',
    borderBottom: '1px solid #000',
    lineHeight: '0.1em',
    margin: '0px 0px 35px 0px' 
 },
  hrWord: { 
     background: '#fff',
     padding:'0px 10px',
 }
})


class HostSelect extends Component {
  state = {
    selectedSite: '',
    open: false,
    edit: false,
    fullSiteInfo:{},
  };

  componentDidMount = ()=> {
    if( this.props.state.device.site.id ){
      this.setState({
        ...this.state,
        selectedSite: this.props.state.device.site.id
      })
    } 
  } 

  addSite = () => {
      this.setState ({
          ...this.state,
          open: true,
      })
  }

  handleClose = () => {
    this.setState ({
        ...this.state,
        open: false,
        edit: false,
    })
}

  editSite = () => {
    let allSite = this.props.state.site
      for (let i = 0; i < allSite.length; i++ ){
        if (allSite[i].id === this.state.selectedSite){
          this.setState({
            ...this.state,
            edit: true,
            fullSiteInfo: allSite[i],
          })
        }
      }
  
  }

  handleChange =  (event) => {
    this.setState({
      selectedSite: event.target.value,
    });
  }

  componentDidUpdate(previousProps){
   //if site was reacently added to the breaker reducer, check through the org's sites, and make sure it 
   //exists, then set it to state if it does!
   if(previousProps.state.site !== this.props.state.site){
      if( this.props.state.device.site.id ){
        for (let i = 0; i <this.props.state.site.length; i++)
          {  
            if (this.props.state.site[i].id === this.props.state.device.site.id ){
                this.setState({
                  ...this.state,
                  selectedSite: this.props.state.device.site.id,
                  //breakers: this.props.state.breaker.siteBreakerReducer
                })
            }
          }
      }
    } 
  }

  assignSite = () => {
    //check if this site isn't already saved in the breaker reducer. if it is,
    //moce it to there and dispatch breakers!
    if (this.state.selectedSite !== this.props.state.device.site.id ){
      let allSite = this.props.state.site
      let mySite = []
      for (let i = 0; i < allSite.length; i++ ){
        if (allSite[i].id === this.state.selectedSite){
          mySite.push(allSite[i]);
        }
      }
    this.props.dispatch({type: 'SET_DEVICE_SITE', payload: mySite[0]})
    this.props.dispatch({type: 'FETCH_SITE_BREAKERS', payload: this.state.selectedSite})
    }
  }

  render() {
    const {classes} = this.props; 
    return (
      
          <Grid item style={{maxWidth: '800px'}} align='center'>
          <AddSite handleClose = {this.handleClose} open = {this.state.open}/>
          <EditSite handleClose = {this.handleClose} open = {this.state.edit} site={this.state.fullSiteInfo}/>
            <Paper className = {classes.paper} elevation = {3}>
                <h1>Select Your Host Site</h1>
                <div style={{marginBottom: '20px'}}> 
                <p style={{margin: 'auto 40px'}}>
                    Please choose from existing below or click the 'Add Site' button.
                    </p>   
                </div>
                <Grid container direction = 'row' justify = 'center' alignItems = 'center'>
                    <FormControl variant="filled" className={classes.formControl}>
                      <InputLabel>Choose From Existing Sites</InputLabel>
                      <Select
                      id = 'siteSelect'
                      value={this.state.selectedSite}
                      onChange={this.handleChange}
                      >
                      <MenuItem value="">
                          <em>None of these</em>
                      </MenuItem>
                      {this.props.state.site.map((site, index)=>
                      (<MenuItem value={site.id||''} key = {index}>{site.address}</MenuItem>)
                      )}
                      </Select>
                    </FormControl>
                  {
                    this.state.selectedSite ?
                      <div>
                        <DynamicButton type='edit' text='Edit' handleClick={this.editSite}/>
                      </div>
                    :<DynamicButton type='edit' text='Edit' isDisabled = {true}/>
                  }  
                 </Grid>       
                <br/>
                <br/>
                <h2 className={classes.hrWordDivder}><span className={classes.hrWord}>Or</span></h2>    
                    <DynamicButton key='addSite-button-enabled' type='add' text='Add Site' handleClick={this.addSite}/>     
                <br/>
                <br/>
                <Grid container direction = 'row'>
                    <DynamicButton type='previous' text='Previous' linkURL='/devicePrep'/>
                    <div className = {classes.grow}></div>
                    {this.state.selectedSite ?
                        <DynamicButton key={'enabled-site-next'} type='next' text='Next' handleClick={this.assignSite} linkURL='/breakerSelect'/>
                      :
                        <DynamicButton key={'disabled-site-next'} type='next' text='Next' isDisabled={true}/>
                    }
                </Grid>
            </Paper>
            </Grid>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

HostSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(HostSelect));


