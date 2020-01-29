import { LocationDto } from "./location.dto";

export class NearplaceDto {
     readonly placeId:number
     readonly location:LocationDto
     readonly placeName:String
     readonly photoReference:String
     readonly type:String
}
