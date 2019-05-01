import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../constants";

const CAButtonIcon = props => {
  const { iconName, iconSize, iconColor } = props;

  return (
    <TouchableOpacity style={{ padding: 16 }} {...props}>
      <Ionicons
        name={iconName || "md-menu"}
        size={iconSize || 24}
        color={iconColor || Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default CAButtonIcon;
