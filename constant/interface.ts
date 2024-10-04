export interface IUserDoc {
  username: string;
  email: string;
  uid: string;
  address: string;
  phoneNumber: string;
  region: string;
  school: string;
  major: string;
  schoolEmail: string;
  membershipType:
    | "임시회원"
    | "일반회원"
    | "준회원"
    | "정회원"
    | "멤버"
    | "관리자"
    | "정회원(승인대기중)"
    | "준회원(승인대기중)";
  agreement: boolean;
  fileURL: string;
  fileQualifyUrl: string;
  membership: string;
  coupons: {
    points: number;
    accumulated: number;
    coupons: string[];
  };
}

export interface IUser {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export interface IChatUser {
  uid: string;
  displayName: string | null;
  email: string | null;
}
