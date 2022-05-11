// Register models. This is needed as sometimes mongoose fails because a model was
// accessed at a point in code which might not have been earlier initialized
import "./User/User";
import "./CalorieEntry/CalorieEntry";
