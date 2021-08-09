import "./scss/index.scss";

import React, { useState } from 'react';
import { AlertManager, useAlert } from "react-alert";
import { useIntl, IntlShape } from "react-intl";
import { commonMessages } from "@temp/intl";
import { accountConfirmUrl } from "../../../app/routes";

import { Button, Form, TextField, Radio } from "../..";
import { maybe } from "../../../core/utils";
import { RegisterAccount } from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager,
  intl: IntlShape
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);

  if (successful) {
    hide();
    alert.show(
      {
        title: data.accountRegister.requiresConfirmation
          ? intl.formatMessage({
              defaultMessage:
                "Please check your e-mail for further instructions",
            })
          : intl.formatMessage({ defaultMessage: "New user has been created" }),
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState('physical');

  return (
    <TypedAccountRegisterMutation
      onCompleted={data => showSuccessNotification(data, hide, alert, intl)}
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <Form
            errors={maybe(() => data.accountRegister.errors, [])}
            onSubmit={(event, {
              email,
              password,
              nameOrg,
              legalAddress,
              addresses,
              phone,
              inn,
              orgn,
              kpp,
              bankAccount,
              bank,
              correspondentBankAccount,
              bik,
            }) => {
              event.preventDefault();
              const isEntity = activeTab === 'entity';
              const redirectUrl = `${window.location.origin}${accountConfirmUrl}`;
              registerCustomer({ variables: {
                email,
                password,
                redirectUrl,
                isEntity,
                nameOrg,
                legalAddress,
                addresses,
                phone,
                inn,
                orgn,
                kpp,
                bankAccount,
                bank,
                correspondentBankAccount,
                bik,
              } });
            }}
          >
            <div className="login__select-role">
              <Radio
                value="physical"
                checked={activeTab === 'physical'}
                onChange={() => setActiveTab("physical")}
                name="role">
                Physical person
                </Radio>
              <Radio
                value="entity"
                checked={activeTab === 'entity'}
                onChange={() => setActiveTab("entity")}
                name="role">
                Entity
              </Radio>
            </div>
            <TextField
              name="email"
              autoComplete="email"
              label={intl.formatMessage(commonMessages.eMail)}
              type="email"
              required
            />
            <TextField
              name="password"
              autoComplete="password"
              label={intl.formatMessage(commonMessages.password)}
              type="password"
              required
            />
            {activeTab === 'entity' ? (
              <>
                <TextField
                  name="nameOrg"
                  maxLength={6}
                  label={intl.formatMessage(commonMessages.nameOrg)}
                  required
                />
                <TextField
                  name="legalAddress"
                  label={intl.formatMessage(commonMessages.legalAddress)}
                  required
                />
                <TextField
                  name="addresses"
                  label={intl.formatMessage(commonMessages.addresses)}
                  required
                />
                <TextField
                  name="phone"
                  maxLength={16}
                  label={intl.formatMessage(commonMessages.phone)}
                  required
                />
                <TextField
                  name="inn"
                  minLength={12}
                  maxLength={12}
                  label={intl.formatMessage(commonMessages.inn)}
                  required
                />
                <TextField
                  name="orgn"
                  minLength={12}
                  maxLength={12}
                  label={intl.formatMessage(commonMessages.orgn)}
                  required
                />
                <TextField
                  name="kpp"
                  minLength={9}
                  maxLength={9}
                  label={intl.formatMessage(commonMessages.kpp)}
                  required
                />
                <TextField
                  name="bankAccount"
                  minLength={20}
                  maxLength={20}
                  label={intl.formatMessage(commonMessages.bankAccount)}
                  required
                />
                <TextField
                  name="bank"
                  label={intl.formatMessage(commonMessages.bank)}
                  required
                />
                <TextField
                  name="correspondentBankAccount"
                  minLength={20}
                  maxLength={20}
                  label={intl.formatMessage(commonMessages.correspondentBankAccount)}
                  required
                />
                <TextField
                  name="bik"
                  minLength={8}
                  maxLength={8}
                  label={intl.formatMessage(commonMessages.bik)}
                  required
                />
              </>
            ) : ""}
            <div className="login__content__button">
              <Button
                testingContext="submitRegisterFormButton"
                type="submit"
                {...(loading && { disabled: true })}
              >
                {loading
                  ? intl.formatMessage(commonMessages.loading)
                  : intl.formatMessage({ defaultMessage: "Register" })}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
