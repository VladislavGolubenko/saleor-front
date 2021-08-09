import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  RegisterAccount,
  RegisterAccountVariables,
} from "./gqlTypes/RegisterAccount";

const accountRegisterMutation = gql`
  mutation RegisterAccount(
    $email: String!
    $password: String!
    $redirectUrl: String!
    $isEntity: Boolean!
    $legalAddress: String!
    $addresses: String!
    $nameOrg: String!
    $phone: String!
    $inn: String!
    $orgn: String!
    $kpp: String!
    $bankAccount: String!
    $bank: String!
    $correspondentBankAccount: String!
    $bik: String!
  ) {
    accountRegister(
      input: {
      email: $email,
      password: $password,
      isEntity: $isEntity,
      nameOrg: $nameOrg,
      addresses: $addresses,
      legalAddress: $legalAddress,
      phone: $phone,
      inn: $inn,
      orgn: $orgn,
      kpp: $kpp,
      bankAccount: $bankAccount,
      bank: $bank,
      correspondentBankAccount: $correspondentBankAccount,
      bik: $bik,
      redirectUrl: $redirectUrl
      }
    ) {
      errors {
        field
        message
      }
      requiresConfirmation
    }
  }
`;

export const TypedAccountRegisterMutation = TypedMutation<
  RegisterAccount,
  RegisterAccountVariables
>(accountRegisterMutation);
