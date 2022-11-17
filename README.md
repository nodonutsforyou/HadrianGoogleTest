# Test Assigment for Hadrian

Task description
```
We aim to have most of our tests automated. We would like to see an automated test for an
example domain. You have the choice to create your test with Cypress or Selenium. It should
cover the following test case:
- Open Google.com, accept any cookie consent forms.
- Perform a search for Because hackers know hackers best.
- Assert that the Hadrian corporate site is among the results
- Assert that the Hadrian corporate site is among the first 10 pages
- Return the page number the Hadrian corporate site is on
```

## Usage
```
npx cypress open
```
Navigate cypress runner to start the test

## Description

The test located at `cypress\e2e\google.cy.js`, it is asingle test with several variable configured at `cypress.config.js`:
- cookies_button_text: text on the battuon to Accept all cookies. In this repo it is specified fopr Netherlands, depending on region it could be different
- sublink_to_look_for: `hadrian.io` by default, could be configured if domain name changes
- max_depth_page: by the task the page expected to be found at the first page. The test would also work correctly if this value is increased
- max_depth_to_go_down: max ammount of pages to go down. By the task we expected to go do 10 pages, but can be configured to go deeper

## Notes

If used too often, Google can slow down the results. To mitigate that, I had to increase several timeout values