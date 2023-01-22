import { latToCyrDict } from "./src/latToCyrDict.js";
import { cyrToLatDict } from "./src/cyrToLatDict.js";
import { exceptions } from "./exceptions/exceptions.js";

const dictionary = {
    latToCyr: latToCyrDict,
    cyrToLat: cyrToLatDict,
    exceptions
}

export { dictionary }