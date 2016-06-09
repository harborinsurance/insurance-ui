import faker from 'faker';

export const    APPROVED = "approved",
                PENDING = "pending",
                REJECTED = "rejected",
                APPLICATION_STATES = [APPROVED, PENDING, REJECTED];

export function makeFakeApplications (count) {
    let applications = [];
    for (let i = 0 ; i < count ; i++) {
        let application = {
            _id: faker.random.uuid(),
            status: _.sample(APPLICATION_STATES),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            dateOfBirth: faker.date.past(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            streetAddress: faker.address.streetAddress(),
            streetAddressCont: "",
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipCode: parseInt(faker.address.zipCode()),
            coverage: faker.random.number(200000),
            socialSecurityNumber: faker.random.number(),
            submittedAt: faker.date.recent(),
            riskScore: faker.random.number(75) + 25,
            creditScore: faker.random.number(400) + 400
        };

        application.policy = {
            paid: false,
            name: `${faker.company.catchPhraseAdjective()} Renters Insurance`,
            description: faker.lorem.paragraph(),
            cost: faker.random.number(250) + 50
        };

        applications.push(application);
    }
    return applications;
}

export function humanizeFieldName(camelCase) {
    if (camelCase === null || camelCase === "") {
        return camelCase;
    }

    camelCase = camelCase.trim();
    let newText = "";
    for (let i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i]) && i !== 0 && /[a-z]/.test(camelCase[i - 1])) {
            newText += " ";
        }
        if (i === 0 && /[a-z]/.test(camelCase[i])) {
            newText += camelCase[i].toUpperCase();
        } else {
            newText += camelCase[i].toLowerCase();
        }
    }

    return newText;
}
