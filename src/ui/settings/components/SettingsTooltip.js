import PropTypes from "prop-types";
import React from "react";

const SettingsTooltip = ({
	text, zIndex
}) => (
	<span className="tooltipCustom" style={{zIndex}}>?
		<span id="enterURLTooltipText" className="tooltiptext">{text}</span>
	</span>
);

SettingsTooltip.propTypes = {
	text: PropTypes.string.isRequired, zIndex: PropTypes.number.isRequired
};

export default SettingsTooltip;
