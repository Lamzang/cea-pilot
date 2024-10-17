"use client";

import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { app } from "./firebase";

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LfGi2QqAAAAAG_eosPU0W204q1tnQvB9AYmKoRw"
  ),
  isTokenAutoRefreshEnabled: true,
});
