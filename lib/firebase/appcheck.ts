"use client";

import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { app } from "./firebase";

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LdNUWMqAAAAAMPUvbe60GJyoDXFA3fkMprVs59o"
  ),
  isTokenAutoRefreshEnabled: true,
});
