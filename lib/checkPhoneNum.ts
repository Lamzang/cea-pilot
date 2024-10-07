export default function checkPhoneNum(
  phoneNum: string | undefined | null
): string {
  let phoneNumberOnly = "";
  if (!phoneNum) return phoneNumberOnly;
  for (let i = 0; i < phoneNum.length; i++) {
    if (phoneNum[i] >= "0" && phoneNum[i] <= "9") {
      phoneNumberOnly += phoneNum[i];
    }
  }
  return phoneNumberOnly;
}
