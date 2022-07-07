import PropTypes from "prop-types";
import React from "react";

const About = (props) => {
	const {style} = props;
	return (
		<div style={style}>
			<h1>About</h1>
			<p>Report issues and suggest features <a href="https://github.com/naresh97/History-AutoDelete-Rebooted/issues">here</a></p>
			<span>Contributors:</span>
			<ul>
				<li>Nareshkumar Rao, Kenny Do</li>
			</ul>
		</div>
	);
};

About.propTypes = {style: PropTypes.object};

export default About;
