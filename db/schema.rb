# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140315233943) do

  create_table "accounts", force: true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "clients", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "balance",    default: 0
    t.datetime "deleted_at"
  end

  create_table "invitations", force: true do |t|
    t.string   "email"
    t.string   "role"
    t.integer  "invitable_id"
    t.string   "invitable_type"
    t.integer  "user_id"
    t.datetime "date_sent"
    t.datetime "date_accepted"
    t.string   "claim_hash"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "invitations", ["invitable_id"], name: "index_invitations_on_invitable_id"
  add_index "invitations", ["invitable_type"], name: "index_invitations_on_invitable_type"
  add_index "invitations", ["user_id"], name: "index_invitations_on_user_id"

  create_table "invoice_items", force: true do |t|
    t.integer  "amount"
    t.integer  "client_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.boolean  "payment",     default: false
    t.datetime "deleted_at"
  end

  create_table "reports", force: true do |t|
    t.integer "balance", default: 0
    t.date    "date",                null: false
  end

  add_index "reports", ["date"], name: "index_reports_on_date", unique: true

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
