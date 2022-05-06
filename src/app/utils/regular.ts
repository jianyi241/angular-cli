export const pwdReg = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,}).{8,}$/

export function regPwd(val): boolean {
    return pwdReg.test(val)
}
