import React from 'react';
import {Box, Flex} from 'theme-ui';
import {colors, Button, Divider, Paragraph, Text, Title} from '../common';
import {CheckCircleTwoTone} from '../icons';
import {SubscriptionPlan} from './support';
import logger from '../../logger';

type Props = {};
type State = {};

const PricingCard = ({
  title,
  description,
  cta,
  pricing,
  features,
}: {
  title: string;
  description: string;
  cta: React.ReactElement;
  pricing: React.ReactElement;
  features: React.ReactElement;
}) => {
  return (
    <Box
      mx={2}
      p={3}
      sx={{
        flex: 1,
        border: '1px solid #f5f5f5',
        borderRadius: 4,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 8px',
      }}
    >
      <Title level={3}>{title}</Title>
      <Paragraph style={{minHeight: 44}}>{description}</Paragraph>

      <Box my={3}>{cta}</Box>

      <Box sx={{fontSize: 16}}>{pricing}</Box>

      <Divider />

      {features}
    </Box>
  );
};

const PricingSection = ({
  title,
  description,
  cta,
  pricing,
  features,
  bordered,
  selected,
}: {
  title: string;
  description: string;
  cta: React.ReactElement;
  pricing: React.ReactElement;
  features: React.ReactElement;
  bordered?: boolean;
  selected?: boolean;
}) => {
  return (
    <Box
      mx={2}
      p={3}
      sx={{
        flex: 1,
        border: bordered ? '1px solid #f5f5f5' : 'none',
      }}
    >
      <Flex sx={{alignItems: 'baseline', justifyContent: 'space-between'}}>
        <Title level={3}>{title}</Title>
        {selected && (
          <CheckCircleTwoTone
            twoToneColor={colors.green}
            style={{fontSize: 16}}
          />
        )}
      </Flex>
      <Paragraph style={{minHeight: 44}}>{description}</Paragraph>

      <Box my={3}>{cta}</Box>

      <Box sx={{fontSize: 16}}>{pricing}</Box>

      <Divider />

      {features}
    </Box>
  );
};

// TODO: move to separate file?
export const PricingOptionsModal = ({
  pending,
  selected = 'starter',
  onSelectPlan,
}: {
  pending?: boolean;
  selected: SubscriptionPlan | null;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}) => {
  const handleSelectStarterPlan = () => onSelectPlan('starter');
  const handleSelectTeamPlan = () => onSelectPlan('team');

  return (
    <Flex mx={-2} sx={{maxWidth: 960}}>
      <PricingSection
        title="Starter"
        description="Basic live chat and inbox to get you started."
        cta={
          <Button
            type="primary"
            size="large"
            block
            ghost={selected !== 'starter'}
            disabled={pending}
            loading={selected === 'starter' && pending}
            onClick={handleSelectStarterPlan}
          >
            Select Starter plan
          </Button>
        }
        pricing={
          <Text>
            <Text strong>$0</Text> forever
          </Text>
        }
        features={
          <>
            <Paragraph>Comes with:</Paragraph>

            <Paragraph>
              <ul>
                <li>2 seats included</li>
                <li>100,000 messages</li>
                <li>30 day message retention</li>
                <li>Customizable chat widget</li>
              </ul>
            </Paragraph>
          </>
        }
        selected={selected === 'starter'}
      />

      <PricingSection
        title="Team"
        description="Supercharge your support, sales, and marketing."
        cta={
          <Button
            type="primary"
            size="large"
            block
            disabled={pending}
            loading={selected === 'team' && pending}
            ghost={selected !== 'team'}
            onClick={handleSelectTeamPlan}
          >
            Select Team plan
          </Button>
        }
        pricing={
          <Text>
            <Text strong>$94</Text>/month
          </Text>
        }
        features={
          <>
            <Paragraph>
              Everything in <Text strong>Starter</Text> plus:
            </Paragraph>

            <Paragraph>
              <ul>
                <li>10 seats included</li>
                <li>Unlimited data retention</li>
                <li>Website screen sharing</li>
                <li>Webhooks</li>
                <li>Priority support</li>
              </ul>
            </Paragraph>
          </>
        }
        bordered
        selected={selected === 'team'}
      />

      <PricingSection
        title="Enterprise"
        description="Advanced workflows, security, and support."
        cta={
          <a href="mailto:founders@papercups.io?Subject=Papercups Enterprise Edition">
            <Button type="primary" size="large" block ghost disabled={pending}>
              Contact sales
            </Button>
          </a>
        }
        pricing={<Text>Custom pricing</Text>}
        features={
          <>
            <Paragraph>
              Everything in <Text strong>Team</Text> plus:
            </Paragraph>

            <Paragraph>
              <ul>
                <li>Unlimited seats</li>
                <li>On-premise deployment</li>
                <li>Custom integrations</li>
              </ul>
            </Paragraph>
          </>
        }
      />
    </Flex>
  );
};
