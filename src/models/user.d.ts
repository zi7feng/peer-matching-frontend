/**
 * User type
 */

export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?: string;
    gender:string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    inviteCode: string;
    tags: string[];
    createTime: Date;
};
