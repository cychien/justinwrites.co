import SparklesIcon from "@heroicons/react/outline/SparklesIcon";
import BookOpenIcon from "@heroicons/react/outline/BookOpenIcon";
import DesktopComputerIcon from "@heroicons/react/outline/DesktopComputerIcon";
import HeartIcon from "@heroicons/react/outline/HeartIcon";

function getIconComponent(iconName) {
  switch (iconName) {
    case "sparkles":
      return SparklesIcon;
    case "books":
      return BookOpenIcon;
    case "desktop":
      return DesktopComputerIcon;
    case "heart":
      return HeartIcon;
    default:
      return null;
  }
}

export default getIconComponent;
