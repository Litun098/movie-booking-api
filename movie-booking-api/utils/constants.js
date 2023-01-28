const releaseStatus={

    released:"RELEASED",
    unreleased:"UNRELEASED",
    blocked:"BLOCKED"
}

const userType ={
    customer:"CUSTOMER",
    client:"CLIENT",
    admin:"ADMIN"
}

const userStatus = {
    pending:"PENDING",
    approved:"APPROVED",
    rejected:"REJECTED"
}

module.exports = {
    releaseStatus:releaseStatus,
    userType,
    userStatus
}