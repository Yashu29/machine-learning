/**
 * support_vector.jsx: initial form.
 *
 * @SupportVector, must be capitalized in order for reactjs to render it as a
 *     component. Otherwise, the variable is rendered as a dom node.
 *
 * Note: this script implements jsx (reactjs) syntax.
 */

import ModelGenerate from '../session-type/model_generate.jsx';
import ModelPredict from '../session-type/model_predict.jsx';
import DataNew from '../session-type/data_new.jsx';
import DataAppend from '../session-type/data_append.jsx';
import Submit from '../general/submit.jsx';
import ResultDisplay from '../result/result_display.jsx';
import Spinner from '../general/spinner.jsx';
import checkValidString from '../validator/valid_string.js';

var SupportVector = React.createClass({
  // initial 'state properties'
    getInitialState: function() {
        return {
            value_session_type: '--Select--',
            ajax_done_result: null,
            ajax_done_error: null,
            ajax_fail_error: null,
            ajax_fail_status: null
        };
    },
  // update 'state properties'
    changeSessionType: function(event){
      // reset value(s)
        this.setState({ajax_done_result: null});
        this.setState({submit: false});
        this.setState({send_data: false});

      // define sessionType
        if (event.target.value && checkValidString(event.target.value)) {
            this.setState({value_session_type: event.target.value});
        }
    },
  // update 'state properties' from children component (i.e. 'render_submit')
    displaySubmit: function(event) {
        this.setState({submit: event.render_submit});

      // don't display result, if no submit button present
        if (!event.render_submit) {
            this.setState({ajax_done_result: null});
        }
    },
    sendData: function(event) {
        this.setState({send_data: event.created_submit_button});
    },
  // send form data to serverside on form submission
    handleSubmit: function(event) {
      // prevent page reload
        event.preventDefault();

      // local variables
        var sessionType = this.state.value_session_type;
        if (
            sessionType == 'data_new' || sessionType == 'data_append' ||
            sessionType == 'model_generate' || sessionType == 'model_predict'
        ) {
            var ajaxEndpoint = '/load-data/';
            var ajaxArguments = {
                'endpoint': ajaxEndpoint,
                'data': new FormData(this.refs.analysisForm)
            };

          // boolean to show ajax spinner
            this.setState({display_spinner: true});

          // asynchronous callback: ajax 'done' promise
           ajaxCaller(function (asynchObject) {
            // Append to DOM
                if (asynchObject && asynchObject.error) {
                    this.setState({ajax_done_error: asynchObject.error});
                } else if (asynchObject) {
                    this.setState({ajax_done_result: asynchObject});
                }
                else {
                    this.setState({ajax_done_result: null});
                }
            // boolean to hide ajax spinner
                this.setState({display_spinner: false});
            }.bind(this),
          // asynchronous callback: ajax 'fail' promise
            function (asynchStatus, asynchError) {
                if (asynchStatus) {
                    this.setState({ajax_fail_status: asynchStatus});
                    console.log('Error Status: ' + asynchStatus);
                }
                if (asynchError) {
                    this.setState({ajax_fail_error: asynchError});
                    console.log('Error Thrown: ' + asynchError);
                }
            // boolean to hide ajax spinner
                this.setState({display_spinner: false});
            }.bind(this),
          // pass ajax arguments
            ajaxArguments);
        }
    },
  // triggered when 'state properties' change
    render: function() {
        var Result = ResultDisplay;
        var SessionType = this.getSessionType(this.state.value_session_type);

        if (this.state.submit) {
            var SubmitButton = Submit;
        }
        else {
            var SubmitButton = 'span';
        }

        if (this.state.display_spinner) {
            var AjaxSpinner = Spinner;
        }
        else {
            var AjaxSpinner = 'span';
        }

        {/* return:
            @analysisForm, attribute is used within 'handleSubmit' callback
            @formResult, is accessible within child component as
                'this.props.formResult'
        */}
        return(
            <form onSubmit={this.handleSubmit} ref='analysisForm'>
                <fieldset className='fieldset-session-type'>
                    <legend>Session Type</legend>
                    <p>Choose a session type</p>
                    <select
                        name='session_type'
                        autoComplete='off'
                        onChange={this.changeSessionType}
                        value={this.state.value_session_type}
                    >
                        <option value='' defaultValue>--Select--</option>
                        <option value='data_new'>New Data</option>
                        <option value='data_append'>Append Data</option>
                        <option value='model_generate'>Generate Model</option>
                        <option value='model_predict'>Make Prediction</option>
                    </select>
                </fieldset>

                <SessionType onChange={this.displaySubmit} />
                <SubmitButton onChange={this.sendData} />
                <Result formResult={this.state.ajax_done_result} />
                <AjaxSpinner />
            </form>
        );
    },
  // call back: used for the above 'render' (return 'span' if undefined)
    getSessionType: function(type) {
        return {
            data_new: DataNew,
            data_append: DataAppend,
            model_generate: ModelGenerate,
            model_predict: ModelPredict
        }[type] || 'span';
    }
});

// indicate which class can be exported, and instantiated via 'require'
export default SupportVector
