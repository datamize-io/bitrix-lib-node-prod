import { BitrixInstance, b24jssdk } from "../../dist/bitrix/index.js";

let $b24: B24Frame;

initializeB24Frame()
  .then((response: B24Frame) => {
    $b24 = new BitrixInstance(response);

    return $b24.instance.entity("Contact").collect();
  })
  .then((response: Result) => {
    const data = response.getData();
    console.info("response >> ", data);
    console.info("load >> stop ");
  })
  .catch((error) => {
    console.error(error);
  });
