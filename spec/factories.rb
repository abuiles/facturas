FactoryGirl.define do
  factory :client do
    first_name "John"
    last_name  "Doe"
    email { "#{first_name}.#{last_name}@example.com".downcase }
    phone "5555555"
  end

  factory :invoice_item do
    amount 10000
    description 'random thing'
    payment false
  end
end
