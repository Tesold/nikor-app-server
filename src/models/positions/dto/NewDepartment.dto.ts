import { Department } from "../department.model";
import { PositionName } from "../positionsName.model";

export class NewDepartment extends Department
{
     PositionName:PositionName[];
}