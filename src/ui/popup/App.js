import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getHostname, spliceWWW} from "../../libs";
import FilteredExpression from "./components/FilteredExpression";
import RowAction from "./components/RowAction";
import {addExpressionUI} from "../UIActions";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {tab: {}};
	}

	async componentDidMount() {
		const tabs = await browser.tabs.query({
			currentWindow: true, active: true
		});
		this.setState({tab: tabs[0]});
	}

	async clearHistoryDomain(tabDomain) {
		let getResults = () => {
			browser.history.search({
				text: tabDomain,
				startTime: 0
			}).then((results) => {
				if (results.length !== 0) {
					results.forEach(
						(result) => browser.history.deleteUrl({url: result.url})
					);
					return getResults();
				}
				return false;
			}).catch();
		};
		getResults();
	}

	// Flash a green background if successfull
	animateSuccess(element) {
		element.classList.add("successAnimated");
		setTimeout(() => {
			element.classList.remove("successAnimated");
		}, 1500);
	}

	// Flash a red background if it failed or couldn't be done
	animateFailure(element) {
		element.classList.add("failureAnimated");
		setTimeout(() => {
			element.classList.remove("failureAnimated");
		}, 1500);
	}

	render() {
		const {tab} = this.state;
		const {onNewExpression} = this.props;
		const splicedURL = spliceWWW(tab.url);
		const hostname = getHostname(tab.url);
		const urlStyle = {
			display: "flex", alignItems: "center"
		};

		return (
			<div className="container">
				<div className="row">

					<div className="col-md-12">
						<b style={{fontSize: "20px"}}>Host Website:</b>
						<i style={{float: "right"}} onClick={() => browser.runtime.openOptionsPage()} className="fa fa-cog fa-2x cursorPoint" aria-hidden="true"></i>
					</div>

					<div style={urlStyle}>
						<img style={{
							height: "1em", width: "1em", margin: "0 10px 0px 13px"
						}} src={tab.favIconUrl} />
						<span>{hostname}</span>
					</div>

				</div>
				<div className="row lineBreak" />
				<RowAction
					text={`Auto Delete Domain (${hostname}*)`}
					action={() => onNewExpression({expression: `${hostname}*`})}
					labelFor="addExpression"
				/>
				<RowAction
					text={`Auto Delete Domain and SubDomain (*${hostname}*)`}
					action={() => onNewExpression({expression: `*${hostname}*`})}
					labelFor="addExpressionSubdomain"
				/>
				<div className="row lineBreak" />
				<RowAction
					text={"Clear All History for this Domain"}
					action={() => this.clearHistoryDomain(hostname)}
					labelFor="clearHistory"
				/>

				<div className="row lineBreak" />
				<div className="row">

					<FilteredExpression url={splicedURL}/>

				</div>
			</div>
		);
	}
}

App.propTypes = {onNewExpression: PropTypes.func};

const mapDispatchToProps = (dispatch) => ({onNewExpression(payload) {
	dispatch(
		addExpressionUI(payload)
	);
}});

export default connect(null, mapDispatchToProps)(App);
