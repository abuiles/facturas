require 'spec_helper'

describe InvoiceItem do
  it { should belong_to(:client) }
  it { should validate_presence_of(:amount) }
  it { should validate_presence_of(:description) }
end
