'use strict';

import {
  InformaticsStudent,
  StudentOfInformatics,
  StudentInformatician
} from './test/InformaticsStudent';

function registerTestObjects() {
  try {
    // window.open( "../out/index.html" );
  } finally {
    Object.defineProperty( window, "inheritanceImitator", {
      value: {},
      configurable: false,
      enumerable: false
    } );
    window.inheritanceImitator.studentA = new InformaticsStudent();
    window.inheritanceImitator.studentB = new StudentOfInformatics();
    window.inheritanceImitator.studentC = new StudentInformatician();
  }
}

registerTestObjects();