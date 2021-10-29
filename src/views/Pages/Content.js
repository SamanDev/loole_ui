import React, { Component } from "react";
import $ from "jquery";
import Countdown from "react-countdown";
import userService from "services/user.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import eventBus from "views/eventBus";
import { printMatchBlock,printGameBlock } from "components/include";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Spinner,
  Carousel
} from "react-bootstrap";
import GameSlide from "components/GameSlide";

import { useAllEvents } from "services/hooks"
const Landing = () => {
  
  var _constants = window.location.href.split('content/')[1].replace('%20',' ')
  
    
    return (
      
    <>
    
    <div className="wrapper">
            <div className="parallax filter-gradient orange section-gray" data-color="red" style={{height:100}}>
                <div className="parallax-background">
                    <img className="parallax-background-image" src={require("assets/images/games/8Pool.jpg").default}/>
                </div>
                <div className= "container">
                    <div className="row">
                        <div className="col-md-7">
                            
                        </div>
                        <div className="col-md-5  hidden-xs">
                            <div className="parallax-image">
                                <img className="phone" src="/assets/img/showcases/showcase-1/iphone.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section-gray"  style={{margin:0}}>
            <div className="container">
                { (_constants == 'terms-and-conditions')&&(
                    <div class="td-pb-span8 td-main-content" role="main">
                            <div class="td-ss-main-content"><div class="clearfix"></div>
                                                                        <div class="td-page-header">
                                            <h1 class="entry-title td-page-title">
                                                <span>Terms and Conditions</span>
                                            </h1>
                                        </div>
                                        <div class="td-page-content tagdiv-type">
                                        <p><span>Updated August 14th. 2020</span></p>
<p><b>OVERVIEW – PLAY NICE</b></p>
<p><span>Repeat Technologies, Inc. “Loole.gg” (formerly known as XY Gaming) strives to provide a fair and equitable system for all our users. We endeavor to treat our clients as we would like to be treated and expect all our clients to treat each other with respect and honesty. If you attempt to cheat or break the rules, we will not only remove you from the system, but also ban you and prosecute to the full extend allowable at law, which may include civil actions &amp; criminal charges.</span></p>
<p><b>IMPORTANT LEGAL NOTICE REGARDING TERMS OF USE OF Loole.gg</b></p>
<p><span>IMPORTANT! PLEASE CAREFULLY READ THESE TERMS OF USE BEFORE USING Loole.gg, AS THEY AFFECT YOUR LEGAL RIGHTS AND OBLIGATIONS.</span></p>
<p><b>USER AGREEMENT</b></p>
<p><span>Loole.gg owns and operates the Website that links to these Terms of Use. We are pleased to offer you access to our Website and the ability to participate in our online gaming contests of skill, other content, products, services, and promotions (collectively the “Services”) that we may provide from our Website, subject to these Terms of Use (the “Terms of Use”), our privacy policy (the “Privacy Policy”) and the Official Rules and Regulations for the applicable contests and promotions (the “Rules” or “Rules and Scoring,” and together with the Terms of Use and the Privacy Policy, the “Agreements”).</span></p>
<p><b>CONSIDERATION</b></p>
<p><span>You agree to these Terms of Use by accessing or using the Website, registering for Services offered on the Website, or by accepting, uploading, submitting or downloading any information or content from or to the Website. IF YOU DO NOT AGREE TO BE BOUND BY ALL OF THESE TERMS OF USE, DO NOT USE THE WEBSITE. These Terms of Use constitute a legal agreement between you and Loole.gg and shall apply to your use of the Website and the Services even after termination.</span></p>
<p><span>From time to time, Loole.gg may define and post on the Site additional, specific terms, codes of conduct or guidelines that govern your use of the Site or any special events (“Special Events”). In the event of a discrepancy between these Terms and any other writing posted on the Site by Repest.gg, including the Special Events, these Terms shall control. In no way shall this provision be construed to incorporate, acknowledge or make any recommendation regarding third-party Terms and Conditions, for example, terms and conditions that may govern your use of any third-party equipment, games or content. It is solely your responsibility to ensure that your use of any and all third-party equipment, games or content is in compliance with any and all third-party requirements.</span></p>
<p><b>ELIGIBILITY</b></p>
<p><span>As a general rule, if you are 18 years or older, you may open your own account and participate in all contests, or win prizes offered by the Website. If you are over 13 but under 18, you may create an account with your legal guardian’s permission.&nbsp;</span></p>
<p><b>Any user who is under the age of 18 </b><span>is not eligible to participate in cash-entry tournaments, only in free entry with cash prizes, or in coin-entry with coin prize tournaments.</span><b>&nbsp;</b><b><br/>
</b><b><br/>
</b><b>Any user who is under the age of 13 </b><span>is not eligible to participate in any tournaments we run on the website.</span></p>
<p><span>In jurisdictions, territories, and locations where the minimum age for permissible use of the Website is greater than 18 years old, you must meet the age requirement in your local jurisdiction or territory. You must be at least 19 years of age at time of contest registration if you are a legal resident of Alabama or Nebraska. Legal residents physically located in any of the 50 states and Washington DC, excluding Arizona, Arkansas, Connecticut, Delaware, Florida, Louisiana, Maryland, Montana, South Carolina, South Dakota, Tennessee and Washington State are eligible to open an account and participate in contests offered by the Website. Legal residents of Arizona, Arkansas, Connecticut, Delaware, Florida, Louisiana, Maryland, Montana, South Carolina, South Dakota, Tennessee and Washington State (the “Excluded States”) are ineligible for prizes offered by the Website. VOID WHERE PROHIBITED OR RESTRICTED BY LAW. Residents of the Excluded States are eligible to open and maintain accounts on the Website for use only in games that do not offer prizes. Legal residents of Canada are eligible to open an account and participate in contests offered by the Website.</span></p>
<p><span>You may establish only one account per person to participate in the Services offered on the Website. In the event Loole.gg discovers that you have opened more than one account per person, in addition to any other rights that Loole.gg may have, Loole.gg reserves the right to suspend or terminate any or all of your accounts and terminate, withhold or revoke the awarding of any prizes. You are responsible for maintaining the confidentiality of your login names and passwords and you accept responsibility for all activities, charges, and damages that occur under your account. It shall be a violation of these Terms of Use to allow any other person to use your account to participate in any contest. If you have reason to believe that someone is using your account without your permission, you should contact us immediately. We will not be responsible for any loss or damage resulting from your failure to notify us of unauthorized use. If we request registration information from you, you must provide us with accurate and complete information and must update the information when it changes.</span></p>
<p><span>You agree to hold Us harmless from any liability such that We cannot be held liable if laws applicable to You restrict or prohibit Your participation in any Special Events or contests arranged and established through the Site or otherwise. We make no representations or warranties, implicit or explicit, as to Your legal right to participate in any Special Events facilitated nor shall any person affiliated, or claiming affiliation with Us, have authority to make such representations or warranties.&nbsp;</span></p>
<p><span>“Authorized Account Holder” is defined as the natural person 18 years of age or older who is assigned to an e-mail address by an Internet access provider, on-line service provider, or other organization (e.g., business, education institution, etc.) that is responsible for assigning e-mail addresses for the domain associated with the submitted e-mail address for registration on the Website. By inputting a payment method to participate in real money contests, the Authorized Account Holder hereby affirms that the Authorized Account Holder is the lawful owner of the payment method account used to make any deposit(s) on the Website. It shall be a violation of these Terms of Use for any Authorized Account Holder to submit payment using any payment method that is not owned by the Authorized Account Holder.</span></p>
<p><span>Loole.gg employees may use the Website, and will from time to time do so for the purpose of testing the site user experience, socializing and competing with customers to build community, and other reasonable and fair uses at the discretion of Loole.gg.</span></p>
<p><b>CONTEST ENTRY</b></p>
<p><span>Users will be able to visit the Website and view the games available for entry (the “Contests”). Each head to head game will have an entry fee set as agreed between the players. Each multi-player tournament that is not free to enter has an entry fee listed in US dollars.</span></p>
<p><span>When you select to participate in a Contest and complete the entry process, the listed amount of US dollars will be debited from your Loole.gg account.</span></p>
<p><b>REFUND POLICY</b></p>
<p><span>All payments are final. No refunds will be issued particularly for any funds lost in skilled gaming contests or multi-player tournaments. Loole.gg’s discretion is absolute.</span></p>
<p><b>CONDITIONS OF PARTICIPATION</b></p>
<p><span>By entering a Contest, entrants agree to be bound by these Rules and the decisions of Loole.gg, which shall be final and binding in all respects. The Company, at its sole discretion, may disqualify any entrant from a Contest, refuse to award benefits or prizes and require the return of any prizes, if the entrant engages in conduct the Company deems to be improper, unfair or otherwise adverse to the operation of the Contest or is in any way detrimental to other entrants. Improper conduct includes, but is not limited to:</span></p>
<ul>
<li><span>Falsifying personal information required to enter a Contest or claim a prize;</span></li>
<li><span>Engaging in any type of financial fraud including unauthorized use of credit instruments to enter a&nbsp;Contest or claim a prize;</span></li>
<li><span>With the exception of team events, colluding with any other individual(s) or engaging in any type of&nbsp;syndicate play;</span></li>
<li><span>Any violation of Contest rules or the Terms of Use;</span></li>
<li><span>Using automated means (including but not limited to harvesting bots, robots, parser, spiders or screen&nbsp;scrapers) to obtain, collect or access any information on the Website or of any User for any purpose.</span></li>
<li><span>Any type of bonus abuse, abuse of the refer-a-friend program, or abuse of any other offers or&nbsp;promotions;</span></li>
<li><span>Using so-called “Smurf” accounts (accounts that are operated in addition to the main account and whose rank is deliberately kept low to compete against weaker players online) on the platform. Which are either reported by other users or stand out for other reasons.</span></li>
<li><span>Attaching GameID’s to your account that are not owned by the Loole.gg account holder.</span></li>
<li><span>Tampering with the administration of a Contest or trying to in any way tamper with the computer&nbsp;programs or any security measure associated with a Contest;</span></li>
<li><span>Obtaining other entrants’ information and spamming other entrants; or</span></li>
<li><span>Abusing the Website in any way.</span></li>
</ul>
<p><span>Loole.gg reserves the right to close or suspend the Accounts of, and void all account balances and entries by any person where, in Loole.gg’s reasonable opinion, the Account has not been operated with integrity, followed Loole.ggs Conditions of Participation and/or the matches had not been played on a good faith basis. Loole.gg can in its sole discretion, withhold any or all related funds in the Account pending the outcome of an investigation on that Account.</span></p>
<p><span>Users further acknowledge that the forfeiture and/or return of any prize shall in no way prevent Loole.gg from pursuing criminal or civil proceedings in connection with such conduct.</span></p>
<p><span>By entering into a Contest or accepting any prize, entrants, including but not limited to the winner(s), agree to indemnify, release and to hold harmless Loole.gg, its parents, subsidiaries, affiliates and agents, as well as the officers, directors, employees, shareholders and representatives of any of the foregoing entities (collectively, the “Released Parties”), from any and all liability, claims or actions of any kind whatsoever, including but not limited to injuries, damages, or losses to persons and property which may be sustained in connection with participation in the Contest, the receipt, ownership, use or misuse of any prize or while preparing for, participating in and/or travelling to or from any prize related activity, as well as any claims based on publicity rights, defamation, or invasion of privacy. Loole.gg may, in its sole and absolute discretion, require an Authorized Account Holder to execute a separate release of claims similar to the one listed above in this Paragraph as a condition of being awarded any prize or receiving any payout.</span></p>
<p><span>Loole.gg is not responsible for: any incorrect, invalid or inaccurate entry information; human errors; postal delays/postage due mail; technical malfunctions; failures, including public utility or telephone outages; omissions, interruptions, deletions or defects of any telephone system or network, computer online systems, data, computer equipment, servers, providers, or software (including, but not limited to software and operating systems that do not permit an entrant to participate in a Contest), including without limitation any injury or damage to any entrant’s or any other person’s computer or video equipment relating to or resulting from participation in a Contest; inability to access the Website, or any web pages that are part of or related to the Website; theft, tampering, destruction, or unauthorized access to, or alteration of, entries and/or images of any kind; data that is processed late or incorrectly or is incomplete or lost due to telephone, postal issues, computer or electronic malfunction or traffic congestion on telephone lines or transmission systems, or the Internet, or any service provider’s facilities, or any phone site or website or for any other reason whatsoever; typographical, printing or other errors, or any combination thereof.</span></p>
<p><span>Loole.gg is not responsible for incomplete, illegible, misdirected or stolen entries. If for any reason a Contest is not capable of running as originally planned, or if a Contest, computer application, or website associated therewith (or any portion thereof) becomes corrupted or does not allow the proper entry to a Contest in accordance with the Terms of Use or applicable Contest rules, or if infection by a computer (or similar) virus, bug, tampering, unauthorized intervention, actions by entrants, fraud, technical failures, or any other causes of any kind, in the sole opinion of Loole.gg corrupts or affects the administration, security, fairness, integrity, or proper conduct of a Contest, the Company reserves the right, at its sole discretion, to disqualify any individual implicated in such action and/or to cancel, terminate, extend, modify or suspend the Contest, and select the winner(s) from all eligible entries received. If such cancellation, termination, modification or suspension occurs, notification will be posted on the Website.</span></p>
<p><span>ANY ATTEMPT BY AN ENTRANT OR ANY OTHER INDIVIDUAL TO DELIBERATELY DAMAGE THE WEBSITE OR UNDERMINE THE LEGITIMATE OPERATION OF ANY CONTEST IS A VIOLATION OF CRIMINAL AND/OR CIVIL LAWS AND SHOULD SUCH AN ATTEMPT BE MADE, Loole.gg RESERVES THE RIGHT TO SEEK DAMAGES AND OTHER REMEDIES FROM ANY SUCH PERSON TO THE FULLEST EXTENT PERMITTED BY LAW.</span></p>
<p><span>All entries become the property of Loole.gg and will not be acknowledged or returned.</span></p>
<p><span>To be eligible to enter any contest or receive any prize, the Authorized Account Holder may be required to provide Loole.gg with additional documentation and/or information to verify the identity of the Authorized Account Holder, and to provide proof that all eligibility requirements are met. In the event of a dispute as to the identity or eligibility of an Authorized Account Holder, Loole.gg will, in its sole and absolute discretion, utilize certain information collected by Loole.gg to assist in verifying the identity and/or eligibility of such Authorized Account Holder.</span></p>
<p><span>Participation in each Contest must be made only as specified in the Terms of Use. Failure to comply with these Terms of Use will result in disqualification and, if applicable, prize forfeiture.</span></p>
<p><span>Where legal, both entrants and winner consent to the use of their name, voice, and likeness/photograph in and in connection with the development, production, distribution and/or exploitation of any Contest or the Website. Winners agree that from the date of notification by Loole.gg of their status as a potential winner and continuing until such time when Loole.gg informs them that they no longer need to do so that they will make themselves available to Loole.gg for publicity, advertising, and promotion activities.</span></p>
<p><span>Loole.gg&nbsp;reserves the right to move entrants from the Contests they have entered to substantially similar Contests in certain situations determined by Loole.gg in its sole discretion.</span></p>
<p><b>CONTEST PRIZES AND PROMOTIONS</b></p>
<p><span>Prizes will only be awarded if a Contest is run. We reserve the right to cancel Contests at any time. In the event of a cancellation, all entry fees will be refunded to the customer except as specifically provided in these Terms of Use.</span></p>
<p><span>Guaranteed prizes are offered in connection with some of the Contests offered by the Website. Each Contest or promotion is governed by its own set of official rules. We encourage you to read such Contest and promotions Rules before participating.</span></p>
<p><b>OTHER LEGAL RESTRICTIONS</b></p>
<p><b>CONTEST OF SKILL</b></p>
<p><b>Contests offered on the Website are contests of skill.&nbsp;</b><span>Winners are determined by the objective criteria described in the Contest deadline, roster, Rules, scoring, and any other applicable documentation associated with the Contest. From all entries received for each Contest, winners are determined by the individuals who use their skill and knowledge of relevant sports information and fantasy sports rules to accumulate the most points according to the corresponding scoring rules. The Website and Contests may not be used for any form of illicit gambling.</span></p>
<p><b>CONTEST RESULTS</b></p>
<p><span>Contest results and prize calculations are based on the final statistics and scoring results at the completion of the last game of each individual Contest. Once Contest results are reviewed and graded, prizes are awarded. The scoring results of a Contest will not be changed regardless of any official statistics or scoring adjustments made at later times or dates, except in Loole.gg’ sole discretion.</span></p>
<p><span>Loole.gg&nbsp;reserves the right, in its sole and absolute discretion, to deny any contestant the ability to participate in head-to-head contests for any reason whatsoever. Further, Loole.gg may, in its sole and absolute discretion, invalidate any head-to-head contest result for the purposes of preventing abusive and/or any unfair or potentially unlawful activity, or in the event that there is a risk of any such abusive, illegal, or unfair activity.</span></p>
<p><b>PRIZES</b></p>
<p><span>At the conclusion of each Contest, prizes will be immediately awarded except in circumstances where technical failure or other reasons prevent such timely payout. Prizes won are added to the winning participants account balance. In the event of a tie, prizes are divided evenly amongst the participants that have tied.</span></p>
<p><span>Loole.gg&nbsp;reserves the right, in its sole discretion, to cancel or suspend the contests (or any portion thereof) should virus, bugs, unauthorized human intervention, or other causes corrupt administration, security, fairness, integrity or proper operation of the contest (or any portion thereof) warrant doing so. Notification of such changes may be provided by Loole.gg to its customers but will not be required.</span></p>
<p><b>WITHDRAWAL AND PAYMENT OF PRIZES</b></p>
<p><span>Entrants may withdraw their cash prize awards as well as cash deposits by using the “Withdrawal” option on the Website. Entrants may be requested to complete an affidavit of eligibility and a liability/publicity release (unless prohibited by law) and/or appropriate tax forms and forms of identification including but not limited to a Driver’s License, Proof of Residence, and/or any information relating to payment/deposit accounts as reasonably requested by Loole.gg in order to complete the withdrawal of prizes.</span></p>
<p><span>For users who are under the age of 18 and created an account with their parent or legal guardian’s permission, your parent or legal guardian may be requested to complete an affidavit of eligibility and a liability/publicity release (unless prohibited by law) and/or appropriate tax forms and forms of identification including but not limited to a Driver’s License, Proof of Residence, and/or any information relating to payment/deposit accounts as reasonably requested by Loole.gg in order to complete the withdrawal of prizes.</span></p>
<p><span>Failure to comply with this requirement may result in disqualification and forfeiture of any prizes. Disqualification or forfeiture of any prizes may also occur if it is determined any such entrant did not comply with these Terms of Use in any manner.</span></p>
<p><span>Withdrawals maybe requested by any of the following methods:</span></p>
<ul>
<li><span>Direct Bank Transfers – Minimum amount: US $50. Countries available: US</span></li>
<li><span>Wire Transfers – Minimum amount: US $200. Countries available: All</span></li>
</ul>
<p><span>Wire transfers to international accounts will be initiated in USD and at the spot rate offered by the banks at the time. Loole.gg&nbsp;derives no benefit from currency exchanges and will not enter into any debate about various exchange rates offered.</span></p>
<ul>
<li><span>Paypal – Minimum amount: US $20. Countries available: All</span></li>
<li><span>You may withdraw into the same PayPal account that you used to deposit money with. If you did not deposit money with a PayPal account or want to withdraw to a different account, then we may have to perform additional checks.</span></li>
<li><span>Check – Minimum amount: US $200. Countries available: All</span></li>
</ul>
<p><span>Checks will be in USD and we do not charge any fees for issuing them. Although, we can’t be responsible for any charges made by banks or other financial institutions for banking or cashing checks. Furthermore, many of our checks are issued across borders, and some banks or financial institutions charge additional fees for handling international checks. Before requesting a check, we suggest that you check with your bank or financial institution for any charges that you may incur when banking or cashing your check.</span></p>
<p><span>&nbsp;</span></p>
<p><b>We highly recommend that you deposit your check at a reputable bank or financial institution and avoid using a check cashing store.</b></p>
<p><b>&nbsp;</b></p>
<p><span>Checks within the US will be delivered by regular mail and are expected to arrive within 15 business days. International checks under $1,000 USD will be sent by regular mail and are expected to arrive within 15 business days. International checks over $1,000 USD will be delivered by courier and are expected to arrive within 7 business days. To be able to use our courier service we will need your contact phone number and your address must not be a PO Box or a rural route address.</span></p>
<p><span>Checks are sent to the full name and mailing address listed in your Loole.gg account at the time you make your withdraw request. If your check is sent to an incorrect name or mailing address, you will incur a fee to place a stop-payment order on this check.</span></p>
<p><span>We conduct anti-fraud checks on wagering patterns and deposits of users prior to processing all withdrawals. We may request additional information before your withdrawal is approved. We reserve the right to refuse any withdrawal request that doesn’t meet the guidelines of our Terms of Use.</span></p>
<p><span>We may request that you provide your mailing address and SSN before the withdrawal is processed. This will help us in the event that your annual net winnings exceed $600 and we are required to file a 1099-MISC tax form.</span></p>
<p><span>Promotional deposits, credits, and other bonuses may not be withdrawn from a Loole.gg account unless appropriate terms of the promotion are achieved first by the user.</span></p>
<p><span>All taxes associated with the receipt of any prize are the sole responsibility of the winner. In the event that the awarding of any prizes to winners of Contests is challenged by any legal authority, Loole.gg reserves the right in its sole discretion to determine whether or not to award such prizes.&nbsp;&nbsp;If Your total prizes from Loole.gg in any given year reach $600, and Your participation occurred from within the U.S., Loole.gg will request that You submit Your social security number, and such other information as Loole.gg, in its sole discretion, may require in order to send You a Form 1099 in compliance with the U.S. federal income tax reporting requirements. Failure to provide Your social security number and other requested information at that time may result in termination of Your Account and Site privileges by Loole.gg and Loole.gg’s inability to credit Your Account, distribute the balance of Your Account to You, or distribute any winnings to You in excess of $600.</span></p>
<p><span>No substitution or transfer of prize is permitted, except that Loole.gg reserves the right to substitute a prize of equal value or greater if the advertised prize is unavailable. All prizes are awarded “as is” and without warranty of any kind, express or implied (including, without limitation, any implied warranty of merchantability for a particular purpose).</span></p>
<p><span>Any withdrawal requests, after approved by Loole.gg, will be credited back to the same credit card or method of payment used to deposit funds on the Website. Loole.gg will only release withdrawals to a different credit card or other payment method other than that which was used to make deposit(s) after the aggregate amount of such deposit(s) has already been released back to the credit card(s) or payment method(s) used for the deposit(s).</span></p>
<p><b>TERMINATION AND EFFECT OF TERMINATION</b></p>
<p><span>In addition to any other legal or equitable remedy, Loole.gg may, without prior notice, immediately revoke any or all of your rights granted hereunder. In such event, you will immediately cease all access to and use of the Loole.gg Website. Loole.gg may revoke any password(s) and/or account identification issued to you and deny you access to and use of the Website. Any such action shall not affect any rights and obligations arising prior thereto. All provisions of the Terms of Use which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</span></p>
<p><b>DISCLAIMER OF WARRANTIES</b></p>
<p><span>THE WEBSITE, INCLUDING, WITHOUT LIMITATION, ALL CONTENT, SOFTWARE, AND FUNCTIONS MADE AVAILABLE ON OR ACCESSED THROUGH OR SENT FROM THE WEBSITE, ARE PROVIDED “AS IS,” “AS AVAILABLE,” AND “WITH ALL FAULTS.” TO THE FULLEST EXTENT PERMISSIBLE BY LAW, THE COMPANY AND ITS PARENTS, SUBSIDIARIES AND AFFILIATES MAKE NO REPRESENTATION OR WARRANTIES OR ENDORSEMENTS OF ANY KIND WHATSOEVER (EXPRESS OR IMPLIED) ABOUT: (A) THE WEBSITE; (B) THE CONTENT AND SOFTWARE ON AND PROVIDED THROUGH THE WEBSITE; (C) THE FUNCTIONS MADE ACCESSIBLE ON OR ACCESSED THROUGH THE WEBSITE; (D) THE MESSAGES AND INFORMATION SENT FROM THE WEBSITE BY USERS; (E) ANY PRODUCTS OR SERVICES OFFERED VIA THE WEBSITE OR HYPERTEXT LINKS TO THIRD PARTIES; AND/OR (F) SECURITY ASSOCIATED WITH THE TRANSMISSION OF SENSITIVE INFORMATION THROUGH THE WEBSITE OR ANY LINKED SITE. THE COMPANY DOES NOT WARRANT THAT THE WEBSITE, ANY OF THE WEBSITES’ FUNCTIONS OR ANY CONTENT CONTAINED THEREIN WILL BE UNINTERRUPTED OR ERROR-FREE; THAT DEFECTS WILL BE CORRECTED; OR THAT THE WEBSITES OR THE SERVERS THAT MAKES THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</span></p>
<p><span>THE COMPANY DOES NOT WARRANT THAT YOUR ACTIVITIES OR USE OF THE WEBSITE IS LAWFUL IN ANY PARTICULAR JURISDICTION AND, IN ANY EVENT, THE COMPANY SPECIFICALLY DISCLAIMS SUCH WARRANTIES. YOU UNDERSTAND THAT BY USING ANY OF THE FEATURES OF THE WEBSITE, YOU ACT AT YOUR OWN RISK, AND YOU REPRESENT AND WARRANT THAT YOUR ACTIVITIES ARE LAWFUL IN EVERY JURISDICTION WHERE YOU ACCESS OR USE THE WEBSITE OR THE CONTENT. FURTHER, THE COMPANY AND ITS PARENTS, SUBSIDIARIES AND AFFILIATES DISCLAIM ANY EXPRESS OR IMPLIED WARRANTIES INCLUDING, WITHOUT LIMITATION, NONINFRINGEMENT, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND TITLE.</span></p>
<p><span>THE COMPANY, ITS PARENTS, SUBSIDIARIES AND AFFILIATES, AND THE DIRECTORS, OFFICERS, EMPLOYEES, AND OTHER REPRESENTATIVES OF EACH OF THEM, SHALL NOT BE LIABLE FOR THE USE OF THE WEBSITE INCLUDING, WITHOUT LIMITATION, THE CONTENT AND ANY ERRORS CONTAINED THEREIN. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY NOT APPLY TO THE EXTENT SUCH JURISDICTION’S LAW IS APPLICABLE TO THIS AGREEMENT.</span></p>
<p><b>LIMITATION OF LIABILITY</b></p>
<p><span>YOU UNDERSTAND AND AGREE THAT THE COMPANY LIMITS ITS LIABILITY IN CONNECTION WITH YOUR USE OF THE WEBSITE AS SET FORTH BELOW: UNDER NO CIRCUMSTANCES SHALL THE COMPANY, ITS PARENTS, SUBSIDIARIES, OR AFFILIATES, OR THE DIRECTORS, OFFICERS, EMPLOYEES, OR OTHER REPRESENTATIVES OF EACH OF THEM (COLLECTIVELY, THE “COMPANY ENTITIES AND INDIVIDUALS”), BE LIABLE TO YOU FOR ANY LOSS OR DAMAGES OF ANY KIND (INCLUDING, WITHOUT LIMITATION, FOR ANY SPECIAL, DIRECT, INDIRECT, INCIDENTAL, EXEMPLARY, ECONOMIC, PUNITIVE, OR CONSEQUENTIAL DAMAGES) THAT ARE DIRECTLY OR INDIRECTLY RELATED TO (1) THE WEBSITE, THE CONTENT, OR YOUR UPLOAD INFORMATION; (2) THE USE OF, INABILITY TO USE, OR PERFORMANCE OF THE WEBSITE; (3) ANY ACTION TAKEN IN CONNECTION WITH AN INVESTIGATION BY THE COMPANY OR LAW ENFORCEMENT AUTHORITIES REGARDING YOUR USE OF THE WEBSITE OR CONTENT;(4) ANY ACTION TAKEN IN CONNECTION WITH COPYRIGHT OWNERS; OR (5) ANY ERRORS OR OMISSIONS IN THE WEBSITE’S TECHNICAL OPERATION, EVEN IF FORESEEABLE OR EVEN IF THE COMPANY ENTITIES AND INDIVIDUALS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, STRICT LIABILITY TORT (INCLUDING, WITHOUT LIMITATION, WHETHER CAUSED IN WHOLE OR IN PART BY NEGLIGENCE, ACTS OF GOD, TELECOMMUNICATIONS FAILURE, OR THEFT OR DESTRUCTION OF THE WEBSITE). IN NO EVENT WILL THE COMPANY ENTITIES AND INDIVIDUALS BE LIABLE TO YOU OR ANYONE ELSE FOR LOSS OR INJURY, INCLUDING, WITHOUT LIMITATION, DEATH OR PERSONAL INJURY. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU. IN NO EVENT SHALL THE COMPANY ENTITIES AND INDIVIDUALS TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED ONE HUNDRED DOLLARS ($100). THE COMPANY ENTITIES AND INDIVIDUALS ARE NOT RESPONSIBLE FOR ANY DAMAGE TO ANY USER’S COMPUTER, HARDWARE, COMPUTER SOFTWARE, OR OTHER EQUIPMENT OR TECHNOLOGY INCLUDING, WITHOUT LIMITATION, DAMAGE FROM ANY SECURITY BREACH OR FROM ANY VIRUS, BUGS, TAMPERING, FRAUD, ERROR, OMISSION, INTERRUPTION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER LINE OR NETWORK FAILURE OR ANY OTHER TECHNICAL OR OTHER MALFUNCTION. YOUR ACCESS TO AND USE OF THIS WEBSITE IS AT YOUR RISK. IF YOU ARE DISSATISFIED WITH THE WEBSITE OR ANY OF THE CONTENT, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE ACCESSING AND USING THE WEBSITE OR THE CONTENT. YOU RECOGNIZE AND CONFIRM THAT IN THE EVENT YOU INCUR ANY DAMAGES, LOSSES OR INJURIES THAT ARISE OUT OF THE COMPANY’S ACTS OR OMISSIONS, THE DAMAGES, IF ANY, CAUSED TO YOU ARE NOT IRREPARABLE OR SUFFICIENT TO ENTITLE YOU TO AN INJUNCTION PREVENTING ANY EXPLOITATION OF ANY WEBSITE OR OTHER PROPERTY OWNED OR CONTROLLED BY THE COMPANY AND/OR ITS PARENTS, SUBSIDIARIES, AND/OR AFFILIATES OR YOUR UPLOAD INFORMATION, AND YOU WILL HAVE NO RIGHTS TO ENJOIN OR RESTRAIN THE DEVELOPMENT, PRODUCTION, DISTRIBUTION, ADVERTISING, EXHIBITION OR EXPLOITATION OF ANY COMPANY WEBSITE OR OTHER PROPERTY OR YOUR UPLOAD INFORMATION OR ANY AND ALL ACTIVITIES OR ACTIONS RELATED THERETO. BY ACCESSING THE WEBSITE, YOU UNDERSTAND THAT YOU MAY BE WAIVING RIGHTS WITH RESPECT TO CLAIMS THAT ARE AT THIS TIME UNKNOWN OR UNSUSPECTED. ACCORDINGLY, YOU AGREE TO WAIVE THE BENEFIT OF ANY LAW, INCLUDING, TO THE EXTENT APPLICABLE, CALIFORNIA CIVIL CODE SECTION 1542, THAT OTHERWISE MIGHT LIMIT YOUR WAIVER OF SUCH CLAIMS.</span></p>
<p><b>INTELLECTUAL PROPERTY RIGHTS</b></p>
<p><span>The content on the Website, including without limitation, the text, software, scripts, graphics, photos, sounds, music, videos, interactive features and the like and the trademarks, service marks and logos contained therein (the “Intellectual Property”), are owned by or licensed to Loole.gg, subject to copyright and other intellectual property rights under United States and foreign laws and international conventions. Content on the Website is provided to you AS IS for your information and personal use only and may not be used, copied, reproduced, distributed, transmitted, broadcast, displayed, sold, licensed, or otherwise exploited for any other purposes whatsoever without the prior written consent of the respective owners. Loole.gg reserves all rights not expressly granted in and to the Website and the Intellectual Property. You agree to not engage in the use, copying, or distribution of any of the Intellectual Property other than expressly permitted herein. If you download or print a copy of the Intellectual Property for personal use, you must retain all copyright and other proprietary notices contained therein. You agree not to circumvent, disable or otherwise interfere with security related features of the Website or features that prevent or restrict use or copying of any Intellectual Property or enforce limitations on use of the Website or the Intellectual Property therein.</span></p>
<p><span>Some of the Services may allow you to submit or transmit audio, video, text, or other materials (collectively, “User Submissions”) to or through the Services. When you provide User Submissions, you grant to Loole.gg, its parents, subsidiaries, affiliates, and partners a non-exclusive, worldwide, royalty-free, fully sublicenseable license to use, distribute, edit, display, archive, publish, sublicense, perform, reproduce, make available, transmit, broadcast, sell, translate, and create derivative works of those User Submissions, and your name, voice, likeness and other identifying information where part of a User Submission, in any form, media, software, or technology of any kind now known or developed in the future, including, without limitation, for developing, manufacturing, and marketing products. You hereby waive any moral rights you may have in your User Submissions.</span></p>
<p><span>In addition, you agree that any User Submissions you submit shall not contain any material that is, in the sole and absolute discretion of Loole.gg, inappropriate, obscene, vulgar, unlawful, or otherwise objectionable (hereinafter, “Prohibited Content”). Posting of any Prohibited Content, in addition to any and all other rights and remedies available to Loole.gg, may result in account suspension or termination.</span></p>
<p><span>We respect your ownership of User Submissions. If you owned a User Submission before providing it to us, you will continue owning it after providing it to us, subject to any rights granted in the Terms of Use and any access granted to others. If you delete a User Submission from the Services, our general license to that User Submission will end after a reasonable period of time required for the deletion to take full effect. However, the User Submission may still exist in our backup copies, which are not publicly available. If your User Submission is shared with third parties, those third parties may have retained copies of your User Submissions. In addition, if we made use of your User Submission before you deleted it, we will continue to have the right to make, duplicate, redistribute, and sublicense those pre-existing uses, even after you delete the User Submission. Terminating your account on a Service will not automatically delete your User Submissions.</span></p>
<p><span>We may refuse or remove a User Submission without notice to you. However, we have no obligation to monitor User Submissions, and you agree that neither we nor our parents, subsidiaries, affiliates, employees, or agents will be liable for User Submissions or any loss or damage resulting from User Submissions.</span></p>
<p><span>Except as provided in the Privacy Policy, we do not guarantee that User Submissions will be private, even if the User Submission is in a password-protected area. Accordingly, you should not provide User Submissions that you want protected from others.</span></p>
<p><span>You represent and warrant that you have all rights necessary to grant to Loole.gg the license above and that none of your User Submissions are defamatory, violate any rights of third parties (including intellectual property rights or rights of publicity or privacy), or violate applicable law.</span></p>
<p><b>ARBITRATION, CONSENT TO JURISDICTION IN CALIFORNIA, ATTORNEY’S FEES</b></p>
<p><span>Any and all disputes, claims or controversies arising out of or relating to this Agreement, the breach thereof, or any use of the Website (including all commercial transactions conducted through the Website) (“Claims”), except for claims filed in a small claims court that proceed on an individual (non-class, non-representative) basis, shall be settled by binding arbitration before a single arbitrator appointed by the American Arbitration Association (“AAA”) in accordance with its then governing rules and procedures, including the Supplementary Procedures for Consumer-Related Disputes, where applicable. In agreeing to arbitrate all Claims, you and Loole.gg waive all rights to a trial by jury in any action or proceeding involving any Claim. The arbitration shall be held in California, and judgment on the award rendered by the arbitrator may be entered by any court having jurisdiction thereof. This arbitration undertaking is made pursuant to and in connection with a transaction involving interstate commerce, and shall be governed by and construed and interpreted in accordance with the Federal Arbitration Act at 9 U.S.C. Section 1, et seq. This arbitration provision shall survive termination of this Agreement. Subject to the limitations set forth below, the arbitrator shall have authority to award legal and equitable relief available in the courts of California, provided that:</span></p>
<p><span>The arbitrator shall not have authority to award punitive damages; and</span></p>
<p><span>Any and all claims shall be arbitrated on an individual basis only and shall not be consolidated or joined with or in any arbitration or other proceeding involving a Claim of any other party. You and Loole.gg agree that the arbitrator shall have no authority to arbitrate any Claim as a class action or in any other form other than on an individual basis.</span></p>
<p><span>For any Claims that are not subject to arbitration: (a) the exclusive jurisdiction and venue for proceedings involving Claims shall be the courts of competent jurisdiction sitting within California (the “Forum”), and the parties hereby waive any argument that any such court does not have personal jurisdiction or that the Forum is not appropriate or convenient; (b) you and Loole.gg waive any and all rights to trial by jury with respect to any Claims.</span></p>
<p><span>In the event that either party initiates a proceeding involving any Claim other than an arbitration in accordance with this Section, or initiates a proceeding involving a Claim under this Section other than in the Forum, the other party shall recover all attorneys’ fees and expenses reasonably incurred in enforcing this Agreement to arbitrate and the Forum to which the parties have herein agreed.</span></p>
<p><b>MISCELLANEOUS</b></p>
<p><span>These Terms of Use shall be governed by the internal substantive laws of California, without respect to its conflict of laws principles. Any claim or dispute between you and Loole.gg that arises in whole or in part from the Terms of Use, the Website or any Contest shall be decided exclusively by a court of competent jurisdiction located in California.</span></p>
<p><span>Nothing in the Terms of Use shall create or confer any rights or other benefits in favor of any third parties except as specifically provided herein. By participating in any Contest on the Website, you agree to indemnify, protect, defend and hold harmless Loole.gg, its parents, subsidiaries, affiliates and divisions, and their respective directors, officers, employees, agents and representatives (the “Repeat Entities”), from and against any and all third party claims, liabilities, losses, damages, injuries, demands, actions, causes of action, suits, proceedings, judgments and expenses, including reasonable attorneys’ fees, court costs and other legal expenses including, without limitation, those costs incurred at the trial and appellate levels and in any bankruptcy, reorganization, insolvency or other similar proceedings, and any other legal expenses (collectively, “Claims”) arising from or connected with your use of the Website, any payment methods used, any funding of your account, and/or your participation in any Contest. The Website may contain links to third party websites that are not owned or controlled by Loole.gg. Loole.gg has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites. In addition, Loole.gg will not and cannot censor or edit the content of any third-party site. By using the Website, you expressly relieve Loole.gg from any and all liability arising from your use of any third-party website. Accordingly, we encourage you to be aware when you leave the Website and to read the terms and conditions and privacy policy of each other website that you visit.</span></p>
<p><span>Nothing in the Terms of Use shall create or be deemed to create a partnership, agency, trust arrangement, fiduciary relationship or joint venture between you and Loole.gg.</span></p>
<p><span>Third-party online publishers that refer users to the Loole.gg website shall not be responsible or liable for the Loole.gg website or any of the content, software, or functions made available on, or accessed through, or sent from, the Loole.gg website.</span></p>
<p><span>If any provision of these Terms of Use is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms of Use, which shall remain in full force and effect.</span></p>
<p><span>No waiver of any term of these Terms of Use shall be deemed a further or continuing waiver of such term or any other term, and Loole.gg’ failure to assert any right or provision under these Terms of Use shall not constitute a waiver of such right or provision.</span></p>
<p><span>Loole.gg&nbsp;reserves the right to amend these Terms of Use at any time and without notice, and it is your responsibility to review these Terms of Use for any changes. If you continue to use the Services after we change the Terms of Use, you accept all changes. The failure of Loole.gg to comply with any provision of these Terms of Use due to an act of God, hurricane, war, fire, riot, earthquake, terrorism, act of public enemies, actions of governmental authorities outside of the control of the Company (excepting compliance with applicable codes and regulations) or other force majeure event will not be considered a breach of these Terms of Use.</span></p>
<p><span>Loole.gg&nbsp;AND OTHER TRADEMARKS CONTAINED ON THE WEBSITE ARE TRADEMARKS OR REGISTERED TRADEMARKS OF Loole.gg IN THE UNITED STATES AND/OR OTHER COUNTRIES. THIRD PARTY TRADEMARKS, TRADE NAMES, PRODUCT NAMES AND LOGOS MAY BE THE TRADEMARKS OR REGISTERED TRADEMARKS OF THEIR RESPECTIVE OWNERS. YOU MAY NOT REMOVE OR ALTER ANY TRADEMARK, TRADE NAMES, PRODUCT NAMES, LOGO, COPYRIGHT OR OTHER PROPRIETARY NOTICES, LEGENDS, SYMBOLS OR LABELS ON THE WEBSITE.</span></p>
<p><b>PROHIBITED USES OF THE SITE AND SERVICES</b></p>
<ul>
<li><span>Illegal Funds</span></li>
</ul>
<p><span>By entering into this Agreement and using the Site Services, You declare that the source of funds used by You on the Site is not illegal and that You will not use the Site or Services in any way as a money transfer system. You will not use the Service for any unlawful activity or prohibited transaction under the laws of any jurisdiction that applies to You. If the Company suspects that You may be engaging in or have engaged in fraudulent, unlawful or improper activity, including without limitation, money laundering activities, Your access to the Service may be suspended or terminated immediately and/or Your Account blocked, and the Company shall be entitled to inform relevant authorities. You will cooperate fully with the Company to investigate any suspected unlawful, fraudulent or improper activity.&nbsp;</span></p>
<ul>
<li><span>Collusion</span></li>
</ul>
<p><span>Collusion occurs when two or more Users attempt to gain an unfair advantage by sharing knowledge or other information to other Users’ disadvantage. Any User who attempts to collude or colludes with any other User while using the Service may be permanently banned from using the Service and their Account may be terminated immediately. The Company will use commercially reasonable efforts to investigate complaints registered against Users suspected of collusion. If the Company is informed during play about suspected collusive behavior, it may, in its sole discretion, terminate suspected Users’ access to the Service and/or block their Accounts. However, under no circumstances shall the Company be liable for any loss, whatsoever, sustained by You as a result of the collusive, or otherwise unlawful activity of any person using the Service and no User shall have the right to require the Company to take any other steps against Users suspected of collusion, cheating or any other form of fraud.&nbsp;</span></p>
<ul>
<li><span>Abuse</span></li>
</ul>
<p><span>By entering into this Agreement, You agree that You will not use any technique other than pure skill. Such techniques may include, but are not limited to, establishing multiple Accounts, the use of program codes or commands or any adapted hardware or software to assist play, the impersonation of another User or Account, or deliberately losing games for the purpose of getting a competitive advantage.&nbsp;</span></p>
<p><b>FEEDBACK/REVIEW SYSTEM</b></p>
<p><span>Under this Agreement, You accept and understand that You and Your Account will be subject to feedback and reviews submitted by other users. For purposes of this Agreement, the terms “Material” and “Content” when used in relation to material and content posted by a User shall include any type of Material or Content, including without limitation, verbal, audio and visual.</span></p>
<p><span>The Site provides a forum to post Material, such as comments, feedback or ratings to rate any previous adversaries that they have challenged, including their subjective rating of their ability.&nbsp;</span></p>
<p><span>Loole.gg will remove feedback ratings and comments:</span></p>
<ol>
<li>
<ul>
<li><span>if such Material violates the terms of this Agreement, and we receive satisfactory notification of the same;</span></li>
<li><span>upon mutual agreement of each User; or&nbsp;</span></li>
<li><span>if Loole.gg is legally obligated by court order or Judgment, or pursuant to a settlement agreement resolving a lawsuit.&nbsp;</span></li>
</ul>
</li>
</ol>
<p><span>Users should use caution and good judgment when submitting feedback or ratings for another User, because:</span></p>
<ol>
<li>
<ul>
<li><span>Feedback or ratings cannot be edited or removed once they have been submitted. Feedback and ratings generally become a permanent part of a User’s record and are publicly viewable.</span></li>
<li><span>Users can be held legally responsible for damages to another User’s reputation if a court were to find that the feedback or ratings constitute libel or defamation. Under federal law (the Communications Decency Act) because we do not censor feedback or ratings or investigate them for accuracy, we are not legally responsible for the feedback or ratings that are posted on the Site, even if the feedback or ratings are defamatory. However, this Communications Decency Act does not protect any person who leaves feedback or ratings from liability.</span></li>
</ul>
</li>
</ol>
<p><span>Feedback or ratings that violate the terms of this Agreement, or that meet any of the circumstances described below may be subject to removal.</span></p>
<ol>
<li>
<ul>
<li><span>Loole.gg is provided with a valid court order finding that the disputed feedback or ratings are slanderous, libellous, defamatory or otherwise illegal.</span></li>
<li><span>The feedback or ratings contain profane, vulgar, obscene, or racist language or adult Material. Inflammatory language, such as “fraud, liar, cheater, scam artist, con man” etc., while strongly discouraged, will not be removed.</span></li>
<li><span>The feedback or rating contains personal identifying information about another User, including real name, address, phone number, or e-mail address.</span></li>
<li><span>The feedback or rating makes reference to law enforcement organization investigation.</span></li>
<li><span>The feedback or rating contains links or scripts.</span></li>
<li><span>Feedback or ratings posted or submitted by a User who provided Loole.gg with false contact information and could not be contacted.&nbsp;</span></li>
<li><span>Feedback or ratings posted or submitted by Users who are indefinitely suspended for certain policy violations within 90 days of registration. We believe that Users who are indefinitely suspended soon after registration shouldn’t be able to permanently impact another Account.</span></li>
<li><span>We will automatically remove feedback from Users indefinitely suspended within 90 days of registration. Not all suspension types qualify for automatic feedback removal.&nbsp;</span></li>
</ul>
</li>
</ol>
<p><span>Violations of these provisions may result in a range of actions, including without limitation, Account termination, limits on Account privileges, Account suspension and/or feedback or rating removal. Negative feedback or ratings intended for another User will be considered for removal only in situations where the User responsible for the mistaken posting informs Loole.gg of the error and has already placed the same feedback for the correct User.</span></p>
<p><span>Loole.gg&nbsp;isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</span></p>
<p><span>Valve Corporation is not affiliated with Loole.gg in any way. Valve, the Valve logo, Half-Life, the Half-Life logo, the Lambda logo, Steam, the Steam logo, Team Fortress, the Team Fortress logo, Opposing Force, Day of Defeat, the Day of Defeat logo, Counter-Strike, the Counter-Strike logo, Source, the Source logo, Counter-Strike: Condition Zero, Portal, the Portal logo, Dota, the Dota 2 logo, and Defense of the Ancients are trademarks and/or registered trademarks of Valve Corporation.</span></p>
                                </div>
                                                            <div class="clearfix"></div></div>
                        </div>
                )}
                { (_constants == 'privacy-policy')&&(
                    <div class="td-pb-span8 td-main-content" role="main">
                    <div class="td-ss-main-content"><div class="clearfix"></div>
                                                                <div class="td-page-header">
                                    <h1 class="entry-title td-page-title">
                                        <span>Privacy Policy</span>
                                    </h1>
                                </div>
                                <div class="td-page-content tagdiv-type">
                                <p><span>Effective Date:</span>&nbsp;March 10, 2020</p>
<p><span>Repeat Technologies, Inc. “</span><span>Loole.gg</span><span>”</span><span> (f</span><span>ormerly known as</span><span> XY Gaming)</span><span> recognizes that your privacy is serious business and we are committed to protecting your personal information. This website Privacy Policy (the “Privacy Policy”) describes the types of information collected about you when you visit the Loole.gg.com website (the “Site”), how that information may be used, when it may be disclosed, how you can take steps to control the use and disclosure of your personal information, and how that information is protected by us.</span></p>
<p><span>Loole.gg, (“us”, “we”, or “our”) operates the https://www.</span><span>Loole.gg</span><span> website (the “Service”).</span><span> We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Any terms that are not defined in this Privacy Policy shall have the meaning given in the&nbsp;</span><a href="/content/terms-and-conditions"><span>Terms and Conditions</span></a><span>&nbsp;of Service (the “T&amp;Cs”).</span></p>
<p><span>Key Definitions</span></p>
<ul>
<li><span>“Personal Information” – generally means information about you as an identifiable individual, but excludes business contact information, specific publicly available information, and Gamer Information. It is including, but not limited to, first and last name, date of birth, email address, gender, occupation or other demographic information.</span></li>
<li><span>When we say “Member,” we are referring to the person or entity that is registered with us to use the Services. When we say “you,” we are referring either to a Member or to some other person who visits any of our Websites.</span></li>
<li><span>We provide online platforms that&nbsp;allow gamers the ability to challenge in online tournaments, provide giveaways and related activities&nbsp;(the “Services”).</span></li>
</ul>
<ul>
<li><span>“Gamer Information” means information about activity on the Site by you as a member which is not itself personally identifiable with you and is therefore not Personal Information, but which may be linked (on a non-identifiable basis) to your account information, and includes your (a) Username or Alias, (b) Skill Rating, (c) Top Players Ranking (if any) and Loole.gg Coins&nbsp;balance, (d) scores in games and tournaments, (e) gaming preferences and personal motto, (f) summary of gaming activity, including when you joined, and the number of games that you have played, (g) winnings from games and tournament, and (h) footage of gameplay in promotional materials such as trailers which may be displayed on the Site, or on website run by other parties including those of our marketing partners (for example, “play of the week”, “highlight reel” or similar content).&nbsp;&nbsp;</span></li>
</ul>
<ul>
<li><span>“Personal Data” means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession). It also includes Personal Information.</span></li>
<li><span>Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</span></li>
<li><span>Cookies are small pieces of data stored on your device (computer or mobile device).</span></li>
<li><b>“</b><span>Data Controller” means the natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal information are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your Personal Data.</span></li>
<li><b>“</b><span>Data Processor” (or Service Provider) means any natural or legal person who processes the data on behalf of the Data Controller.&nbsp; We may use the services of various Service Providers in order to process your data more effectively.</span></li>
<li><span>Data Subject is any living individual who is using our Service and is the subject of Personal Data.</span></li>
</ul>
<p><span>This Privacy Policy applies to the Personal Information of all “users” of the Site, including unregistered visitors and “members” who have registered and maintain an account on the Site. This Privacy Policy does not cover any information collected through any other website operated by third parties, such as linked websites operated by sponsors, advertisers or game developers.</span></p>
<p><span>This Privacy Policy will remain in full force and effect with respect to your Personal Information which we retain for a limited period of time after your use or participation in the Site or any particular Service, tournament or game offered through the Site terminates or ceases, or is suspended or deactivated for any reason, in order to ensure that you may easily restart gameplay at a later time. In any case, should you continue to be an inactive player for more than a reasonable time period, Loole.gg will delete your personal information.</span></p>
<p><span>If you do not agree with this Privacy Policy, please do not participate in the Site or any of the activities or Services offered through the Site.</span></p>
<p><span>Finally, this Privacy Policy explains how we manage and safeguard Personal Information in the course of operating our business. We are dedicated to adhering to the following principles that relate to the collection, use, retention and disclosure of Personal Information.</span></p>
<ol>
<li><span> ACCOUNTABILITY</span></li>
</ol>
<p><span>Loole.gg</span><span> is accountable for all Personal Information in its control. This includes information under the direct control of Loole.gg, as well as Personal Information that Loole.gg may transfer to its affiliates or to third party service providers, in each case for the purposes of (i) performing support functions, such as payment processing, business analytics, customer support, printing and mailing, data storage and destruction, and (ii) marketing any of Loole.gg’s products and services. Loole.gg will use contractual or other measures to require third parties that process information or provide services on our behalf to maintain a level of privacy protection comparable to our own practices.</span></p>
<p><span>Numerous individuals within Loole.gg are responsible for the day-to-day collection and processing of Personal Information, including technical and administration personnel trained for this purpose. However, Loole.gg has a designated Privacy Officer who is responsible for Loole.gg’s compliance with applicable privacy legislation. Any questions or concerns with regard to the manner in which Loole.gg handles or manages Personal Information, or in respect of this Privacy Policy should be directed to our Privacy Officer who can be reached as follows:</span></p>
<p><span>Loole.gg</span><span> Privacy Officer</span><span><br/>
</span><a href="mailto:info@Loole.gg"><span>Email:</span><span>&nbsp;</span><span>info@Loole.gg</span></a></p>
<ol start="2">
<li><span> COLLECTION OF INFORMATION</span></li>
<li><span> What information is collected through the sites?</span></li>
</ol>
<p><span>Types of Information</span></p>
<p><span>We collect two types of information from you when you visit the Site: information that does not identify you personally (“Non-Personal Information”); and Personal Information, as defined in more detail above).</span></p>
<p><span>(i) Non-Personal Information</span></p>
<p><span>As examples of Non-Personal Information, we collect:</span></p>
<ul>
<li><span>through our Web servers, automatic recordings of certain technical information related to your visit to the Site. This information is anonymous and does not identify you personally. It includes things such as: the Internet domain for your Internet service provider; the Internet Protocol (IP) address of the computer accessing the Site; the address of the last webpage that you visited prior to clicking through to the Site; the browser used and the type of computer operating system that your computer is using; information about your computer hardware; the date and time that you visited the Site; and a record of which pages you viewed while you were visiting the Site;</span></li>
<li><span>demographic information which does not identify an individual;</span></li>
<li><span>and Gamer Information.</span></li>
</ul>
<p><span>(ii) Personal Information</span></p>
<p><span>We collect Personal Information as follows:</span></p>
<p><span>(a)&nbsp;</span><span>Initial Registration</span><span>&nbsp;from you, in connection with completing the “one step registration” required for you to create a free, basic user account (a “Basic Account”):</span></p>
<ul>
<li><span>your email address for the purpose of (A) verifying your identity by emailing you, (B) you logging in, (C) marketing upcoming game tournaments to you, and (D) emailing game results to you;</span></li>
<li><span>your date of birth, for the purpose of ensuring that you are permitted to create an account based upon your age,</span></li>
<li><span>where you reside, for the purpose of ensuring that you are permitted to create an account based upon your jurisdiction,</span></li>
<li><span>your user name, for the purpose of identifying you, and</span></li>
<li><span>Cookies and Usage Data.</span></li>
</ul>
<p><span>(collectively, the “Basic Information”).</span></p>
<p><span>(b)&nbsp;</span><span>Deposit Funds into the Basic Account:</span><span>&nbsp;from you, for the purpose of creating and depositing funds to the your Basic Account which will allow the Individual to enter cash games and tournaments (a “Real Money Account”), in addition to the Basic Information:</span></p>
<ul>
<li><span>your first name and last name;</span></li>
<li><span>the following information with respect to your credit card: type, number, expiration month, expiration year and card verification number; and</span></li>
<li><span>the following billing information: your street address, city, postal code, province and country.</span></li>
</ul>
<p><span>(c)&nbsp;</span><span>Withdraw funds from Real Money Account:</span><span>&nbsp;from you, for the purpose of confirming your identity:</span></p>
<ul>
<li><span>your Paypal email address, first name, last name; and</span></li>
<li><span>your street address, city, postal code, province and country, and phone number.</span></li>
</ul>
<p><span>(d)&nbsp;</span><span>Withdraw funds from Real Money Account and Claiming Prizes:</span><span>&nbsp;from Individuals, for the purpose of confirming their identity:</span></p>
<ul>
<li><span>Name, photograph, age and address (via a copy of your driver’s license or utility bill);</span></li>
</ul>
<p><span>(e)&nbsp;</span><span>Edit profile:</span><span>&nbsp;from you, for the purpose of updating your contact information, your “site information”, your password, and your communication preferences:</span></p>
<ul>
<li><span>your first name, last name, Individual’s street address, city, postal code, province and country;</span></li>
<li><span>your time zone; your avatar; and your PlayStation Network ID and XBOX Live Gamertag (in order for you to make or accept game challenges, and for us to track your game results;</span></li>
<li><span>in response to our “About you” query, a sentence about the Individual for the purpose of the Individual’s profile;</span></li>
<li><span>your old and new password; and</span></li>
<li><span>your communication preferences.</span></li>
</ul>
<p><span>(f)&nbsp;</span><span>Game challenges (on first challenge):</span><span>&nbsp;from you, your PlayStation Network ID and XBOX Live Gamertag, and Electronic Arts email address, other game specific identifiers, in order to make or accept game challenges, and for us to track your game results</span></p>
<p><span>We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send or by contacting us.</span></p>
<p><span>Usage Data</span></p>
<p><span>We may also collect information how the Service is accessed and used (“Usage Data”). This Usage Data may include information such as your computer’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</span></p>
<p><span>Tracking &amp; Cookies Data</span></p>
<p><span>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</span></p>
<p><span>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</span></p>
<p><span>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</span></p>
<p><span>Examples of Cookies we use:</span></p>
<ul>
<li><b>Session Cookies.</b><span>&nbsp;We use Session Cookies to operate our Service.</span></li>
<li><b>Preference Cookies.</b><span>&nbsp;We use Preference Cookies to remember your preferences and various settings.</span></li>
<li><b>Security Cookies.</b><span>&nbsp;We use Security Cookies for security purposes.</span></li>
</ul>
<p><b>Use of Data</b></p>
<p><span>Loole.gg uses the collected data for various purposes:</span></p>
<ul>
<li><span>To provide and maintain our Service</span></li>
<li><span>To notify you about changes to our Service</span></li>
<li><span>To allow you to participate in interactive features of our Service when you choose to do so</span></li>
<li><span>To provide customer support</span></li>
<li><span>To gather analysis or valuable information so that we can improve our Service</span></li>
<li><span>To monitor the usage of our Service</span></li>
<li><span>To detect, prevent and address technical issues</span></li>
<li><span>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</span></li>
</ul>
<p><b>Legal Basis for Processing Personal Data Under General Data Protection Regulation (GDPR)</b></p>
<p><span>If you are from the European Economic Area (EEA), Loole.gg legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.</span></p>
<p><span>Loole.gg may process your Personal Data because:</span></p>
<ul>
<li><span>We need to perform a contract with you</span></li>
<li><span>You have given us permission to do so</span></li>
<li><span>The processing is in our legitimate interests and it’s not overridden by your rights</span></li>
<li><span>For payment processing purposes</span></li>
<li><span>To comply with the law</span></li>
</ul>
<p><b>Retention of Data</b></p>
<p><span>Loole.gg will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</span></p>
<p><span>Loole.gg will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</span></p>
<p><b>Transfer of Data</b></p>
<p><span>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</span></p>
<p><span>If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</span></p>
<p><span>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</span></p>
<p><span>Loole.gg will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</span></p>
<p><b>Disclosure of Data</b></p>
<p><b>Business Transaction</b></p>
<p><span>If Loole.gg is involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</span></p>
<p><b>Disclosure for Law Enforcement</b></p>
<p><span>Under certain circumstances, Loole.gg may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</span></p>
<p><b>Legal Requirements</b></p>
<p><span>Loole.gg may disclose your Personal Data in the good faith belief that such action is necessary to:</span></p>
<ul>
<li><span>To comply with a legal obligation</span></li>
<li><span>To protect and defend the rights or property of Loole.gg</span></li>
<li><span>To prevent or investigate possible wrongdoing in connection with the Service</span></li>
<li><span>To protect the personal safety of users of the Service or the public</span></li>
<li><span>To protect against legal liability</span></li>
</ul>
<p><b>Security of Data</b></p>
<p><span>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</span></p>
<p><b>“Do Not Track” Signals</b></p>
<p><span>We do not support Do Not Track (“DNT”). Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.</span></p>
<p><span>You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.</span></p>
<p><b>Your Data Protection Rights Under General Data Protection Regulation (GDPR)</b></p>
<p><span>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Loole.gg aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</span></p>
<p><span>If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</span></p>
<p><span>In certain circumstances, you have the following data protection rights:</span></p>
<ul>
<li><b>The right to access, update or to delete the information we have on you.</b><span>&nbsp;Whenever made possible, you can access, update or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.</span></li>
<li><b>The right of rectification.</b><span>&nbsp;You have the right to have your information rectified if that information is inaccurate or incomplete.</span></li>
<li><b>The right to object.</b><span>&nbsp;You have the right to object to our processing of your Personal Data.</span></li>
<li><b>The right of restriction.</b><span>&nbsp;You have the right to request that we restrict the processing of your personal information.</span></li>
<li><b>The right to data portability.</b><span>&nbsp;You have the right to be provided with a copy of the information we have on you in a structured, machine-readable and commonly used format.</span></li>
<li><b>The right to withdraw consent.</b><span>&nbsp;You also have the right to withdraw your consent at any time where Loole.gg relied on your consent to process your personal information.</span></li>
</ul>
<p><span>Please note that we may ask you to verify your identity before responding to such requests.</span></p>
<p><span>You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</span></p>
<p><span>The Site also provide you with certain ways to voluntarily give us your Personal Information, as follows:</span></p>
<ol>
<li><span>from social network sites (“SNS”), where you decide to create an account by logging into a SNS via the Site, certain Personal Information which you have provided the SNS (for example, the name, email address and other Personal Information which the Individual has made publicly available via the SNS, in each case depending on the privacy settings of the Individual on the SNS), for the purpose of completing the opening of the account. For example, see below for details for when you join by Facebook;</span></li>
<li><span>from you, through your interaction with the Site (for example, information about which games were played, player rating information and player game statistics);</span></li>
<li><span>from you, through your completion of contest forms or other participation in promotional efforts, for the purpose of such contests and promotions, including for the purpose of awarding prizes;</span></li>
<li><span>from you, through your completion of surveys, for the purpose of gathering your opinions and comments in regard to Loole.gg’s products and services;</span></li>
<li><span>from you, through using links contained on the Site to send Loole.gg an email message which contains such information, for the purpose identified at the point of collection on the Site;</span></li>
<li><span>from you, to the extent that you post content with such Personal Information to chat windows, user fora or similar fora on the Site, for the purpose of each such forum; and</span></li>
<li><span>from you, to the extent that you provide Personal Information when you contact Loole.gg’s Customer Care representatives via live chat or email.</span></li>
<li><span>from you, through you voluntarily disclosing information about yourself when you use the “Invite Your Friends / Tell-A-Friend” feature, for the purpose of inviting others to create Basic Accounts or Real Money Accounts;</span></li>
<li><span>about other individuals who are identified as your “friends”, in the form of the names and e-mail addresses of your friends when you use the “Invite Your Friends / Tell-A-Friend” feature on the Site, for the purpose of inviting others to create Basic Accounts or Real Money Accounts;</span></li>
</ol>
<p><span>In order to provide a fair playing environment for all users and to protect the integrity of the Site, we also collect Personal Information which we use to investigate complaints of cheating or behavior that we believe may be contrary to the T&amp;Cs, including the Rules of Conduct. This may include screenshots of players’ computer desktops or footage of in-game play.</span></p>
<p><span>In addition to collecting Personal Information directly from visitors to the Site, we may also collect Personal Information from third parties such as marketing partners to which permission has been granted to share that information with us.</span></p>
<p><span>Facebook Connect</span></p>
<p><span>You can register to join Loole.gg via the Site or by logging into your account with certain SNS (i.e., Facebook) via our Site. If you decide to create your Account by logging into a SNS via the Site, we will extract the Personal Information you have provided to the SNS (such as your “real” name, email address and other information you make publicly available via the SNS) from the account you have with such SNS and use that information to create your account; the information we extract may depend on the privacy settings you have with the SNS. For example, our Service allows users to create an account and login to the Service using their Facebook account credentials through Facebook Connect. If you are not currently registered as a Member and you click on “Sign in Using Facebook”, you will first be asked to enter your Facebook credentials and then be given the option to register and join Loole.gg. By using Facebook Connect, you are allowing Loole.gg to access your Facebook account information for the purpose of completing your registration as a Member of Loole.gg, and you are agreeing to the Facebook Terms of Use regarding your use of the Service via Facebook.</span></p>
<ol>
<li><span> Other methods of gathering information</span></li>
</ol>
<p><b>What are “cookies” and how does the Site use them?</b></p>
<p><span>A cookie is a small text file containing a unique identification number that is transferred (through your browser) from a website to the hard drive of your computer. The cookie identifies your browser but will not let a website know any Personal Information about you, such as your name or address. These files are then used by such websites as a kind of electronic identification tag when users revisit that site. Since cookies are only text files, they cannot run on your computer, search your computer for other information, or transmit any information to anyone.</span></p>
<p><span>We and our partners may use various technologies to collect and store information when you use our Services, and this may include using cookies and similar tracking technologies on our Website, such as pixels and web beacons, to analyze trends, administer the website, track users’ movements around the website, serve targeted advertisements, and gather demographic information about our user base as a whole. Users can control the use of cookies at the individual browser level. We partner with third parties to display advertising on our website or to manage and serve our advertising on other sites. Our third party partners may use cookies or similar tracking technologies in order to provide you advertising or other content based upon your browsing activities and interests. If you wish to opt out of interest-based advertising click&nbsp;</span><a href="http://preferences-mgr.truste.com/"><span>http://preferences-mgr.truste.com/</span></a><span>&nbsp;(or if located in the European Union click&nbsp;</span><a href="http://www.youronlinechoices.eu/"><span>http://www.youronlinechoices.eu/</span></a><span>). Please note you might continue to receive generic ads.</span></p>
<p><span>&nbsp;</span></p>
<p><b>What are Web beacons and how does the site use them?</b></p>
<p><span>We use web beacons on our Websites and in our emails. When we send emails to Users, we may track behaviour such as who opened the emails and who clicked the links. This allows us to measure the performance of our email campaigns and to improve our features for specific segments of Members. To do this, we include single pixel gifs, also called web beacons, in emails we send. Web beacons allow us to collect information about when you open the email, your IP address, your browser or email client type, and other similar details. We use the data from those Web Beacons to create reports about how our email campaign performed and how to improve our services.</span></p>
<p><b>What about information from other sources?</b></p>
<p><span>From time to time we may obtain information about you from third party sources, such as public databases, social media platforms, third party data providers and our joint marketing partners. We take steps to ensure that such third parties are legally permitted or required to disclose such information to us. Examples of the information we may receive from other sources include: demographic information, device information (such as IP addresses), location, and online behavioural data (such as information about your use of social media websites, page view information and search results and links). We use this information, alone or in combination with other information (including Personal Information) we collect, to enhance our ability to provide relevant marketing and content to you and to develop and provide you with more relevant products features, and services.</span></p>
<p><b>Behavioral Remarketing</b></p>
<p><span>Beyond Gaming, LLC uses remarketing services to advertise on third party websites to you after you visited our Service. We and our third-party vendors use cookies to inform, optimize and serve ads based on your past visits to our Service.</span></p>
<ul>
<li><b>Google AdWords</b></li>
</ul>
<p><span>Google AdWords remarketing service is provided by Google Inc.</span></p>
<p><span>You can opt-out of Google Analytics for Display Advertising and customize the Google Display Network ads by visiting the Google Ads Settings page:&nbsp;</span><a href="http://www.google.com/settings/ads"><span>http://www.google.com/settings/ads</span></a></p>
<p><span>Google also recommends installing the Google Analytics Opt-out Browser Add-on –&nbsp;</span><a href="https://tools.google.com/dlpage/gaoptout"><span>https://tools.google.com/dlpage/gaoptout</span></a><span>&nbsp;– for your web browser. Google Analytics Opt-out Browser Add-on provides visitors with the ability to prevent their data from being collected and used by Google Analytics.</span></p>
<p><span>For more information on the privacy practices of Google, please visit the Google Privacy &amp; Terms web page:&nbsp;</span><a href="https://policies.google.com/privacy?hl=en"><span>https://policies.google.com/privacy?hl=en</span></a></p>
<ul>
<li><b>Facebook</b></li>
</ul>
<p><span>Facebook remarketing service is provided by Facebook Inc.</span></p>
<p><span>You can learn more about interest-based advertising from Facebook by visiting this page:&nbsp;</span><a href="https://www.facebook.com/help/164968693837950"><span>https://www.facebook.com/help/164968693837950</span></a></p>
<p><span>To opt-out from Facebook’s interest-based ads follow these instructions from Facebook:&nbsp;</span><a href="https://www.facebook.com/help/568137493302217"><span>https://www.facebook.com/help/568137493302217</span></a></p>
<p><span>Facebook adheres to the Self-Regulatory Principles for Online Behavioral Advertising established by the Digital Advertising Alliance. You can also opt-out from Facebook and other participating companies through the Digital Advertising Alliance in the USA&nbsp;</span><a href="http://www.aboutads.info/choices/"><span>http://www.aboutads.info/choices/</span></a><span>, the Digital Advertising Alliance of Canada in Canada&nbsp;</span><a href="http://youradchoices.ca/"><span>http://youradchoices.ca/</span></a><span>&nbsp;or the European Interactive Digital Advertising Alliance in Europe&nbsp;</span><a href="http://www.youronlinechoices.eu/"><span>http://www.youronlinechoices.eu/</span></a><span>, or opt-out using your mobile device settings.</span></p>
<p><span>For more information on the privacy practices of Facebook, please visit Facebook’s Data Policy:&nbsp;</span><a href="https://www.facebook.com/privacy/explanation"><span>https://www.facebook.com/privacy/explanation</span></a></p>
<ol>
<li><span> Personal Information about Children</span></li>
</ol>
<p><span>Our Site is intended for a general audience and we do not knowingly (a) allow people under 18 years of age to create accounts on the Site and (b) collect Personal Information from people under 18 years of age through our Site. In addition, in the event that a visitor to our Site identifies himself or herself as a person under the age of 18, we will not collect, store or use any Personal Information of such individual. In the event that we receive Personal Information that we discover was provided by a person under the age of 18, we will promptly delete all such Personal Information not required for purpose of continuing to block such person’s use of the Site, and will comply with applicable laws, including, as applicable, the U.S. Children’s Online Privacy Protection Act.</span></p>
<ol>
<li><span> Limits to Collecting Personal Information</span></li>
</ol>
<p><span>We limit the type of mandatory information collected by us. We collect only the Personal Information that is required for the purposes described in the following paragraphs under the heading “Use and Disclosure of Personal Information” below (the “Purposes”).</span></p>
<ol start="3">
<li><span> USE AND DISCLOSURE OF PERSONAL INFORMATION</span></li>
</ol>
<p><span>We use and disclose your information for the following purposes.</span></p>
<ol>
<li><span> Internal Uses</span></li>
</ol>
<p><span>We collect, use and disclose your Personal Information for such purposes to which you consent at the time of collection or in any case prior to such use, and as otherwise permitted or required by applicable law, including:</span></p>
<ul>
<li><span>to operate our Site; to open and maintain your customer accounts with us, deposit funds into such accounts, and withdraw funds from such accounts; to edit your profile; and for the purpose of game challenges, in each case as more particularly described above;</span></li>
<li><span>to provide a product or service requested by you;</span></li>
<li><span>to contact you regarding updates to the Site, your account status, our new products and services and upcoming events, changes to our products and services;</span></li>
<li><span>to collect subscription and entry fees from you and to process payments;</span></li>
<li><span>for promotional or related purposes without additional compensation, including with respect to tournaments and the awarding of prizes;</span></li>
<li><span>to prevent fraud and protect the integrity of the Site;</span></li>
<li><span>to deliver prizes to you; and</span></li>
<li><span>to ensure that you comply with the T&amp;Cs (including in order to facilitate a fair gameplay environment) and are permitted to create an account based upon your age and where you reside.</span></li>
<li><span>to, in our discretion, use Personal Information to contact you regarding changes to the T&amp;Cs and any other policies or agreements relevant to the Site, including this Privacy Policy.</span></li>
</ul>
<p><span>Also, if you use the “Invite Your Friends / Tell-A-Friend” feature, we will use the name and e-mail address that you provides to invite your friend to create a user account.</span></p>
<p><span>When you create your account and when we collect your Personal Information, you can customize these preferences. If you wish to change your account preferences to modify the ways that we contact you, please contact Customer Care or, in the case where we use your Personal Information to communicate with you via email, use the “unsubscribe” link included in all email messages sent on our behalf.</span></p>
<ol>
<li><span> Related Entities and Authorized Third-Party Service Providers</span></li>
</ol>
<p><span>In addition to sharing information between entities comprising the Loole.gg group for the Purposes, and in order to better serve our customers, we may transfer Personal Information to third-party service providers who are legally or contractually obligated to only use the information to help us provide our Services and not for any other purpose. For example, Loole.gg uses outside contractors for the purposes of (i) performing support functions, such as payment processing, business analytics, customer support, printing and mailing, data storage and destruction, and (ii) marketing any of Loole.gg’s products and services.</span></p>
<p><span>From time to time such Loole.gg group entities and third parties may hold, use or disclose your Personal Information outside of the United States, and while outside ofUnited States such Personal Information may be accessed by regulatory authorities pursuant to the laws of such other jurisdictions.</span></p>
<p><span>These third parties may be located in the United States, Canada, Australia or elsewhere.</span></p>
<ol>
<li><span> Co-Branded Partners</span></li>
</ol>
<p><span>Co-Branded Partners are third parties with whom Loole.gg may jointly offer a Service or feature, such as a Tournament. You can tell when you are accessing a Service offered by a Co-Branded Partner because the Co-Branded Partner’s name will be featured prominently. You may be asked to provide information about yourself to register for a Service offered by a Co-Branded Partner. In doing so, you may be providing your Personal Information to both us and the Co-Branded Partner, or, with your consent, we may share your Personal Information with the Co-Branded Partner. Please note that the Co-Branded Partner’s privacy policy may apply to its use of your Personal Information.</span></p>
<ol>
<li><span> Marketing Partners</span></li>
</ol>
<p><span>To the consent that you consent, we may also disclose Personal Information you provide us to third party marketing partners who provide products, information or services you have expressly requested or which we believe you may be interested in purchasing or obtaining, in order that they may provide you with information regarding such products, information or services. In doing so, we will make reasonable efforts to ensure that these third parties only use the Personal Information for our stated Purposes and that they provide a method of opting out from receiving future communications from such parties, but we shall not otherwise be responsible for their handling or dissemination practices with respect to Personal Information. If you subsequently wish to change your account preferences to not receive information from such third party marketing partners, please contact Customer Care or use the “unsubscribe” link included in email messages sent by such parties.</span></p>
<ol>
<li><span> Legal Compliance</span></li>
</ol>
<p><span>There may be instances when Loole.gg may disclose Personal Information without providing notice or choice, as required or permitted by applicable laws, which may include (i) where required pursuant to a subpoena, other form of legal process or request on behalf of any local, provincial, state, or federal governmental department or agency; (ii) in an emergency, to protect the safety and physical security of users of the Services or members of the public; or (iii) to investigate breaches of agreements or US&nbsp;law.</span></p>
<ol>
<li><span> Business Transfers</span></li>
</ol>
<p><span>If Loole.gg sells all or part of its business or makes a sale or transfer of its assets or is otherwise involved in a merger or transfer of all or a material part of its business, Loole.gg may transfer your Personal Information to the party or parties involved in the transaction as part of that transaction.</span></p>
<ol start="4">
<li><span> OBTAINING CONSENT</span></li>
</ol>
<p><span>In most cases, when we do collect Personal Information directly from an individual, the Purposes for which the individual provides us with the information – for example, as required for us to effectively provide our Services – will be clear, and as such, consent to the collection and use of Personal Information for those Purposes will be implied by use of the Services. If we choose to use Personal Information already in our possession for a purpose that was not identified at the time we initially collected the information, we will seek the consent of the affected individuals before using this information for the new purpose. Please note that if the new purpose is required or permitted by law, Loole.gg is not required to seek the consent of the affected individuals and may not do so. Individuals may withdraw consent to the collection, use and disclosure of their Personal Information at any time, subject to certain restrictions set out in applicable privacy legislation, but should recognize that by doing so they may be unable to utilize the Services and products offered on the Site. When a member uses the “Invite Your Friends / Tell-A-Friend” feature, we rely on that individual to obtain the consent of their friend to allow us to use that information to invite them to create a user account.</span></p>
<ol start="5">
<li><span> MANAGEMENT OF PERSONAL INFORMATION</span></li>
</ol>
<p><span>Loole.gg</span><span> has policies and procedures as to how long it retains information that it collects. Personal Information that is no longer required to fulfil the Purposes is either destroyed, erased or rendered anonymous to prevent unauthorized parties from gaining access to the information.</span></p>
<p><span>We retain Personal Information received from third parties in accordance with our legal and contractual obligations. The file containing your Personal Information will be made available to the authorized employees, contractors or agents of Loole.gg who need to access the information in connection with the Purposes, and will be held primarily in an electronic database.</span></p>
<p><span>Personal Information included in computer databases is typically stored in a secure data center with an extra copy of the data stored at an alternate location of equal security to ensure that we will be able to retrieve the data even in the event of a disaster. These computer databases may be located in the United States or elsewhere in the world. From time to time, we may transfer Personal Information stored in these databases (as otherwise permitted under this Privacy Policy) to third-party service providers located in the United States or elsewhere in the world. For example, certain third-party service providers such as data storage companies, computer security specialists, database technicians, or corporate affiliates of Loole.gg may have remote access to Personal Information in our custody for the purposes described herein, but we use contractual and other safeguards to ensure that Personal Information transferred to such parties is provided with a comparable level of protection as Loole.gg provides, regardless of the format in which the information exists.</span></p>
<p><span>Loole.gg</span><span> has implemented a variety of commercially reasonable security safeguards to protect Personal Information in our control against loss, theft, misuse and interception by third parties. These safeguards include organizational, technical and physical measures designed to protect information from unauthorized access, disclosure, copying, use or modification. Among the steps taken are:</span></p>
<ul>
<li><span>premises security;</span></li>
<li><span>restricted file access to Personal Information;</span></li>
<li><span>technology safeguards, including network traffic encryption, security software, firewalls to prevent hacking and other unauthorized computer access; and</span></li>
<li><span>internal password and security policies.</span></li>
</ul>
<p><span>However, please note that no data transmission or storage can be guaranteed to be 100% secure. We are committed to protecting your Personal information, but we cannot ensure or warrant the security of any information you transmit to us. Please take reasonable steps to guard against identity theft, including ‘phishing’ attacks. You are responsible for maintaining the confidentiality of your password and account, and you are fully responsible for all activities that occur under your password or account. In the event of unauthorized use of your password or account or any other breach of security, you must notify Loole.gg immediately and promptly change your password.</span></p>
<ol start="6">
<li><span> ACCURACY AND CURRENCY OF PERSONAL INFORMATION</span></li>
</ol>
<p><span>Loole.gg</span><span> is committed to open and fair privacy practices which comply with applicable privacy legislation.</span></p>
<p><span>Any individual may request access to their Personal Information held by Loole.gg by contacting Loole.gg’s Privacy Officer in writing. After receiving such a request, our Privacy Officer shall inform the individual of the existence, use and disclosure of their Personal Information and shall allow the individual to access such information.</span></p>
<p><span>In certain circumstances to the extent permitted or required by applicable law, access to Personal Information may be denied. If we deny an individual’s request for access to their Personal Information, we will advise such individual in writing of the reason for the refusal and they may then challenge our decision.</span></p>
<p><span>Where Personal Information is used on an on-going basis, Loole.gg undertakes to correct any information that is shown to be inaccurate, incomplete or not up-to-date. Otherwise, Loole.gg does not routinely update Personal Information. It is the member’s responsibility to provide us current, complete, truthful and accurate information, including Personal Information, and to keep such information up to date. We cannot and will not be responsible for any problems or liability that may arise if a member does not provide us with accurate, truthful or complete information or Personal Information or the member fails to update such information or Personal Information</span></p>
<p><span>Upon notification from an individual of their desire to have any or all of their Personal Information in our records deleted or destroyed, Loole.gg&nbsp;will undertake to delete or destroy all such information to the extent that retention of such information is not required or permitted by applicable law, such as for the investigation of claims or the defence of an action, and some Personal Information may remain in back-up storage for this purpose.&nbsp;If you wish to delete&nbsp;your data,&nbsp;you can contact support via&nbsp;</span><a href="mailto:support@Loole.gg"><span>support@</span><span>Loole.gg</span></a> <span>.</span></p>
<p><span>In the event that an individual wishes to challenge Loole.gg’s compliance with any of these principles, they can contact Loole.gg’s Privacy Officer using the contact information set out at the outset of this Privacy Policy. If Loole.gg finds a complaint to be justified, appropriate measures will be taken, including, if necessary, amending our policies and practices.</span></p>
<ol start="7">
<li><span> GOVERNING</span></li>
</ol>
<p><span>The Site is governed by and operated in accordance with the laws of the State of California&nbsp;and the federal laws of the United States of America applicable therein, without regard to its conflict of law provisions, and you hereby consent to the exclusive jurisdiction of and venue in the courts of the state of California, in the United States of America, in all disputes arising out of or relating to the Services. Notwithstanding any other provisions of this Policy or the T&amp;Cs, we may seek injunctive or other equitable relief from any court of competent jurisdiction. You agree that any dispute that cannot be resolved between the parties shall be resolved individually, without resort to any form of class action.</span></p>
<p><span>We make no representation that this Site is operated in accordance with the laws or regulations of, or governed by, other nations. By utilizing the Services and participating in Site activities, you certify that you meet the age and other eligibility requirements for the Site and the Services set forth in the T&amp;Cs. If you do not meet the age and other eligibility requirements, please discontinue using the Site and the Services immediately as your continued use of the Site and the Services indicates that you are agreeing to the collection, use, disclosure, management and storage of your Personal Information as described in this Privacy Policy.</span></p>
<ol start="8">
<li><span> CHANGES TO PRIVACY POLICY</span></li>
</ol>
<p><span>All policies and procedures of Loole.gg are reviewed and updated periodically to reflect changes in our practices and Services, including this Privacy Policy. If we modify this Privacy Policy, we will update the “effective Date” and such changes will be effective upon posting to the Site, to the extent that such changes do not require that we first obtain your consent to same.</span></p>
<p><span>Copyright © 2018 Loole.gg – All Rights Reserved</span></p>
<p><span>(last modified: 10th of March, 2020)</span></p>
                        </div>
                                                    <div class="clearfix"></div></div>
                </div>
                )}
            
                    </div>
            </div>
            <div className="section section-game " style={{padding: 0}}>
                <div className="parallax filter-gradient red" data-color="orange"  >
                    <div className="parallax-background">
                        <img className="parallax-background-image" src="/assets/img/bg.jpg"/>
                    </div>
                    
                    <GameSlide/>
                    
                </div>
            </div>
            
         
        </div>
      </>
    );
  
}
export default Landing