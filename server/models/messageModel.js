const messages = [
  {
    id: 1,
    createdOn: new Date(),
    subject: 'Election News',
    message: 'PMB has been re-elected, APC partying hard',
    parentMessageId: 1,
    status: 'sent',
  },
  {
    id: 2,
    createdOn: new Date(),
    subject: 'Liverpool wins the EPL',
    message: 'The wait is over, Liverpool FC is EPL champion',
    parentMessageId: 2,
    status: 'draft',
  },
];

export default messages;
