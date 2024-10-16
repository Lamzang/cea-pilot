"use client";

import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { app } from "./firebase";

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LdNUWMqAAAAAAm4X-FOUqEm3Ejo9uZ4rUWJVoN6"
  ),
  isTokenAutoRefreshEnabled: true,
});
