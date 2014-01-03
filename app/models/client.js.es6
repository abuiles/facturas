export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  phone: DS.attr('string'),
  email: DS.attr('string'),
  invoiceItems: DS.hasMany('invoiceItem', {async: true})
});
