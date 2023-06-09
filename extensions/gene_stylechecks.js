#!/usr/bin/env node

// run Gene's style checks against modified/staged Asciidoc files
const debug   = require('../_debug')
const exec    = require('child_process').execSync
const merge   = require('deepmerge')
const ovMerge = (destinationArray, sourceArray, options) => sourceArray
const chalk   = require('chalk')

const warning = chalk.yellow
const error   = chalk.red

var config  = {
  'gene_stylechecks.js': {
    usage: false,
    testWords: {
      accomplish:     'Simplify',
      additional:     'Simplify',
      additionally:   'Simplify',
      alter:          'Simplify',
      alternatively:  'Simplify',
      appear:         'Simplify',
      appears:        'Simplify',
      approximately:  'Simplify',
      assist:         'Simplify',
      attempt:        'Simplify',
      automatically:  'Simplify',
      begin:          'Simplify',
      beneath:        'Simplify',
      breakthrough:   'Simplify',
      complicated:    'Simplify',
      concerning:     'Simplify',
      consult:        'Simplify',
      contain:        'Simplify',
      contains:       'Simplify',
      containing:     'Simplify',
      demonstrate:    'Simplify',
      determine:      'Simplify',
      difficult:      'Simplify',
      entire:         'Simplify',
      having:         'Simplify',
      highlights:     'Simplify',
      however:        'Simplify',
      illustrates:    'Simplify',
      immediately:    'Simplify',
      innovative:     'Simplify',
      locate:         'Simplify',
      major:          'Simplify',
      modification:   'Simplify',
      modify:         'Simplify',
      modifies:       'Simplify',
      necessary:      'Simplify',
      obtain:         'Simplify',
      operate:        'Simplify',
      perform:        'Simplify',
      pertains:       'Simplify',
      portion:        'Simplify',
      portions:       'Simplify',
      primary:        'Simplify',
      principle:      'Simplify',
      provide:        'Simplify',
      receive:        'Simplify',
      remainder:      'Simplify',
      robust:         'Simplify',
      upon:           'Simplify',
      whenever:       'Simplify',
      within:         'Simplify',
      'e.g':          'Language',
      'i.e':          'Language',
      comprise:       'Language',
      comprised:      'Language',
      colour:         'Language',
      centre:         'Language',
      dialogue:       'Language',
      fibre:          'Language',
      whilst:         'Language',
      via:            'Language',
      hoc:            'Language',
      etc:            'Language',
      et:             'Language',
      ergo:           'Language',
      facti:          'Language',
      versa:          'Language',
      viz:            'Language',
      vs:             'Language',
      filename:       'Spelling',
      'it\'s':        'Spelling',
      lifecycle:      'Spelling',
      realtime:       'Spelling',
      'higher-level': 'Mechanic',

//    fauna:         'Case    ',

      actually:       'Needless',
      any:            'Needless',
      always:         'Needless',
      both:           'Needless',
      certain:        'Needless',
      completely:     'Needless',
      definitely:     'Needless',
      either:         'Needless',
      particular:     'Needless',
      really:         'Needless',
      respective:     'Needless',
      respectively:   'Needless',
      specific:       'Needless',
      specified:      'Needless',
      specifically:   'Needless',
      please:         'Needless',
      basically:      'Needless',
      simply:         'Needless',
      essentially:    'Needless',
      very:           'Needless',
      // each:           'Needless',
      just:           'Needless',
      quite:          'Needless',
      totally:        'Needless',
      been:           'Tense',
      will:           'Tense',
      was:            'Tense',
      well:           'Phrase',
      to:             'Phrase',
      of:             'Phrase',
      on:             'Phrase',
      so:             'Phrase',
      instance:       'Phrase',
      line:           'Phrase',
      number:         'Phrase',
      means:          'Phrase',
      'event':        'Phrase',
      present:        'Phrase',
      point:          'Phrase',
      respect:        'Phrase',
      recommended:    'Phrase',
      sure:           'Phrase',
      than:           'Phrase',
      the:            'Phrase',
      you:            'Phrase',
      course:         'Phrase',
      describes:      'Phrase',
      ui:             'Phrase',
      up:             'Phrase',
      out:            'Phrase',
      time:           'Phrase',
      unable:         'Phrase',
    },
    phraseWords: {
      click:        'right',
      course:       'of',
      describes:    'document',
      'event':        'the',
      instance:     'for',
      line:         'command',
      manager:      'the',
      means:        'by',
      number:       'a',
      of:           'result',
//    of:           'variety',
      on:           'click',
      out:          'check',
      point:        'this',
      present:      'at',
      recommended:  'that',
      respect:      'with',
      so:           'and',
      sure:         'be',
      than:         'different',
      the:          'place',
      time:         'real',
      to:           'order',
      ui:           'Fauna',
      unable:       'is',
      up:           'shows',
      well:         'as',
      you:          'lets',
    },
    acronyms: {
      API:    'Application Programmer Interface',
      APIs:   'Application Programmer Interfaces',
      CPU:    'Central Processing Unit',
      CSV:    'Comma-seperated Variable',
      DNS:    'Domain Name Server',
      GUI:    'Graphic User Interface',
      HTTP:   'Hypertext Transfer Protocol',
      HTTPS:  'Hypertext Transfer Protocol Secure',
      ISP:    'Internet Service Provider',
      NTP:    'Network Time Protocol',
      PDF:    'Putrid Document Format',
      SDK:    'Software Development Kit',
      TCP:    'Transmission Control Protocol',
      UDP:    'User Datagram Protocol',
      URI:    'Universal Resource Identifier',
      URL:    'Universal Resource Locator',
    },
    testWordsRationale: {
      accomplish:    'Replace with "do".',
      additional:    'Replace with "more".',
      additionally:  'Replace with "also".',
      alter:         'Replace with "change".',
      alternatively: 'Replace with "or".',
      appear:        'Replace with "look".',
      appears:       'Replace with "looks".',
      approximately: 'Replace with "about".',
      assist:        'Replace with "help".',
      attempt:       'Replace with "try".',
      automatically: 'Delete when intent is clear.',
      begin:         'Replace with "start".',
      beneath:       'Replace with "under".',
      breakthrough:  'Replace with "new".',
      complicated:   'Replace with "complex".',
      concerning:    'Replace with "about".',
      consult:       'Replace with "see".',
      contain:       'Replace with "have".',
      contains:      'Replace with "has".',
      containing:    'Replace with "with".',
      demonstrate:   'Replace with "show".',
      determine:     'Replace with "see" or "decide".',
      difficult:     'Replace with "hard".',
      entire:        'Replace with "whole".',
      having:        'Replace with "with".',
      highlights:    'Replace with "shows" or "covers".',
      however:       'Replace with ""but".',
      illustrates:   'Replace with ""shows".',
      immediately:   'Replace with "now" or "omit".',
      innovative:    'Replace with "new".',
      locate:        'Replace with "find".',
      major:         'Replace with "main" or "huge".',
      modification:  'Replace with "change".',
      modify:        'Replace with "change".',
      modifies:      'Replace with "changes".',
      necessary:     'Replace with "needed" or "required".',
      obtain:        'Replace with "get".',
      operate:       'Replace with "work".',
      perform:       'Replace with "do".',
      pertains:      'Replace with "applies".',
      portion:       'Replace with "part".',
      portions:      'Replace with "parts".',
      primary:       'Replace with "main".',
      principle:     'Replace with "main".',
      provide:       'Replace with "give" and do not use in place of "enter" for entering data.',
      receive:       'Replace with "get".',
      remainder:     'Replace with "rest".',
      robust:        'Replace with "strong".',
      upon:          'Replace with "on".',
      whenever:      'Replace with "when".',
      within:        'Replace with "in".',
      via:           'Via implies geographic context. Avoid using via as a synonym for "by," "through," or "using".',
      cancelled:     'Replace with "canceled".',
      cancelling:    'Replace with "canceling".',
      since:         'Use "since" when referring to time. Do not use since to mean because.',
      which:         '"Which" is descriptive, but not essential to the meaning to the sentence; enclosed in commas.',
      whether:       '"Whether" should always be used as part of the phrase "whether or not".',
      that:          '"That" introduces a clause essential to the meaning of the sentence, defining the preceding text.',
      while:         'Use to refer to something occurring in time. Avoid as a synonym for although.',
      although:      'Use although to show contrast; the same as "even though".',
      'e.g':         'Replace with "for example".',
      'i.e':         'Replace with "that is".',
      allow:         'Use "allow" only to refer to features, such as security, that permit or deny some action. To describe user capabilities that a feature or product makes easy or possible, use "you can". Permissions are "granted," not "allowed."',
      allows:        'Use "allows" only to refer to features, such as security, that permit or deny some action. To describe user capabilities that a feature or product makes easy or possible, use "you can". Permissions are "granted," not "allowed.',
      affect:        '"Affect" as a verb  means to have an influence on. Effect as a noun means the result or outcome.',
      effect:        '"Affect" as a verb  means to have an influence on. Effect as a noun means the result or outcome.',
      afterwards:    'Replace with "afterward".',
      backwards:     'Replace with "backward".',
      alphabetic:    'Replace with "alphabetical".',
      after:         'Use after to emphasize that completion is necessary before proceeding. Do not use "once" to mean after',
      check:         'Use "select" or "clear" when referring to a checkbox.',
      close:         'Do not use for exit a program or end a connection.',
      done:          'Use "when you are finish" instead of "when you are done."',
      select:        'Use "choose" when a decision needs to be made.',
      when:          'When combines the idea of after with the immediacy of the following action. Do not use "once" to mean when.',
      assure:        'Use insure to mean "to provide insurance," use ensure to mean "to make sure" or "to guarantee," use assure to mean "to state positively" or "to make confident."',
      ensure:        'Use insure to mean "to provide insurance," use ensure to mean "to make sure" or "to guarantee," use assure to mean "to state positively" or "to make confident."',
      insure:        'Use insure to mean "to provide insurance," use ensure to mean "to make sure" or "to guarantee," use assure to mean "to state positively" or "to make confident."',
      install:       'Use "Install" as a verb. Use "installation" as a noun.',
      finalize:      'Use "Install" as a verb. Use "installation" as a noun.',
      installation:  'Do not use for "finish" or "complete."',
      among:         'Among  refers to three or more things. Use "between" to refer to two things , regardless of the total number of items',
      between:       'Among  refers to three or more things. Use "between" to refer to two things , regardless of the total number of items',
      etc:           'Use this abbreviation for "and others" sparingly.',
      farther:       'Farther refers to physical distances, "further" refers to additional degree, quality, or time.',
      further:       'Farther refers to physical distances, "further" refers to additional degree, quality, or time.',
      greater:       'Use "later" when referring to program version.',
      illegal:       'Use "invalid" or "not valid."',
      sample:        'Sample is a graphic representation, not an exact representation',
      thus:          'Often used to restate a definition or point that was not clearly defined in the previous text.',
      therefore:     'Often used to restate a definition or point that was not clearly defined in the previous text.',
      less:          'Use less to refer to a mass amount, value, or degree. Use "fewer" to refer to a countable number of items.',
      fewer:         'Use less to refer to a mass amount, value, or degree. Use "fewer" to refer to a countable number of items.',
      only:          'Place immediately preceding or following the word or phrase it modifies, not just before the verb.',
      onto:          'Use "on to" to log on, use "onto" for "on top of."',
      so:            'When so introduces a clause of purpose or result, change it to "so that".',
      then:          'Then is not a coordinate conjunction and thus cannot correctly join two independent clauses. Avoid using then in an "if/then" construct.',
      initiate:      'Do not use to mean start a program; use "start", instead.',
      comprise:      'Avoid. Comprised of is always incorrect. Use "include" and "contain".',
      comprised:     'Avoid. Comprised of is always incorrect. Use "include" and "contain".',
      leverage:      'Do not use as a verb to mean "take advantage of". Use "take advantage of", "capitalize on", or "use".',
      regarding:     'Replace with "about".',
      towards:       'Replace with "toward".',
      utilize:       'Use only to mean "to find a practical use for," not as a synonym for "use".',

      as:            'Do not use as a synonym for "because" or "while" in subordinate clauses.',
      abort:         'Generally, avoid. Use "end," "exit," or "stop", instead.',
      above:         'For "earlier," use "previous," preceding," or "earlier."  For "above section," use hyperlink.',
      below:         'Use "later," instead.  For "section below," use hyperlink.',
      access:        'Do not use for "start," "create," or "open." Use a more specific verb or phrase.',
      accessible:    'Reserve for things that people can easily use.',
      activate:      'Do not use for "open," "start," or "switch to."',
      active:        'Use active or "open", not "current", to refer to open artifacts. Use current to refer to an artifact that does not change in the context of the discussion.',
      current:       'Use active or "open", not "current", to refer to open artifacts. Use current to refer to an artifact that does not change in the context of the discussion.',
      'and/or':       'Avoid. Choose either "and" or "or", or rewrite the sentence.',
      argument:      'An argument typically is a value or expression containing data or code that is used with an operator or passed to a function. A parameter is a value given to a variable and treated as a constant until the operation is completed. Parameters are often used to customize a program for a particular purpose.',
      parameter:     'An argument typically is a value or expression containing data or code that is used with an operator or passed to a function. A parameter is a value given to a variable and treated as a constant until the operation is completed. Parameters are often used to customize a program for a particular purpose.',
      desire:        'Replace with "want".',
      desired:       'Replace with "wanted". Better yet, do not use past tense.',
      enable:        'Use "you can" to refer to making something possible for the user. It is OK to call a feature or function enabled.',
      enabled:       'Use "you can" to refer to making something possible for the user. It is OK to call a feature or function enabled.',
      enables:       'Use "you can" to refer to making something possible for the user. It is OK to call a feature or function enabled.',
      given:         'Do not use to mean "specified", "particular", or "fixed".',
      initiate:      'Do not use to mean start a program; use "start" instead.',
      its:           'Its is the possessive form; it\'s is the contraction meaning "it is."',
      normal:         'Implies "in a normal manner," which may not be possible for everyone. Replace with "usually", "ordinarily", "generally", or a similar term.',
      net:            'Use "network."',
      normally:       'Implies "in a normal manner," which may not be possible for everyone. Replace with "usually", "ordinarily", "generally", or a similar term.',
      once:           'To avoid ambiguity, do not use as a synonym for "after" or "when".',
      prompt:         'Do not use as a synonym for message.',
      purge:          'Use "delete," "clear," or "remove" instead.',
      quit:           'Use "exit" or "close" instead.',
      remove:         'Do not use "remove" to mean "delete."',
      type:           'Do not use in place of "enter" when entering data.',
      we:             'In general, do not use, except in the phrase "we recommend".',
      wish:           'Replace with "want". Ex.: change "may wish" to "might want."',
      can:            'Use "can" to express probability. Use may to express permission. Use might to express possibility.',
      may:            'Use may to express permission. Generally, replace with "might" or "can."',
      might:          'Use "can" to express probability. Use may to express permission. Use might to express possibility.',

      should:         'Avoid. If the action is mandatory, use "must."',
      set:            'Avoid. Be specific about the action.',
      specify:        'Avoid. Be specific about the action.',
      must:           'If the action is mandatory, use "must."',
      dialog:         'Use "dialog box," not "dialog."',
      new:            'Do not use with "create"; create means new.',

      colour:         'Use "color."',
      centre:         'Use "center."',
      dialogue:       'Use "dialog box".',
      fibre:          'Use "fiber."',
      whilst:         'Use "while."',
      hoc:            'Instead of "ad hoc," use more specific description',
      et:             'Instead of "et al," use "others."',
      versa:          'Instead of "vice versa ," use "and the reverse," or similar.',
      vs:             'Instead of "vs.," use "versus."',

      is:             'You might be using passive voice. Re-write for active voice.',

      filename:       'Two words "file name."',
      'it\'s':        '"it is."  Use "Its" for possessive."',
      lifecycle:      '"Life cycle" as a noun. "Life-cycle" as an adjective."',
      realtime:       '"Real time" as a noun. "Real-time" as an adjective."',

      'higher-level': 'Mechanics; omit hyphen.',

      fauna:      'Should be spelled Fauna.',

      actually:      'Omit unnecessary word.',
      any:           'Omit unnecessary word.',
      both:          'Omit unnecessary word.',
      certain:       'Omit unnecessary word.',
      completely:    'Omit unnecessary word.',
      definitely:    'Omit unnecessary word.',
      either:        'Omit unnecessary word.',
      follow:        'Omit when used as "follow these steps."',
      following:     'Omit when used as "do the following."',
      particular:    'Omit unnecessary word.',
      really:        'Omit unnecessary word.',
      respective:    'Omit unnecessary word.',
      respectively:  'Omit unnecessary word.',
      specific:      'Omit unnecessary word.',
      specified:     'Omit unnecessary word.',
      specifically:  'Omit unnecessary word.',
      please:        'Omit; does not add technical value.',
      basically:     'Omit unnecessary word.',
      simply:        'Omit unnecessary word.',
      essentially:   'Omit unnecessary word.',
      very:          'Omit unnecessary word.',
      each:          'Omit unnecessary word.',
      just:          'Omit unnecessary word.',
      quite:         'Omit unnecessary word.',
      totally:       'Omit unnecessary word.',

      been:          'Use present tense; "is/are" instead of "have been."',
      will:          'Use present tense.',
      was:           'Use present tense.',

  //phrases
      well:          'Use "and" instead of "as well as."',
      to:            'Use "to" instead of "in order to," "for" instead of "in order for," "about" instead of "with regard to" or "with respect to," "can" instead of "is able to," "called" instead of "referred to," "can" instead of "capability to," "must" instead of "need to," ""to" instead of "need to" or "want to"',
      of:            'result of',
      on:            'click on',
      click:         'right click; hyphenate: "right-click."',
      so:            'and so on',
      instance:      'Use "for example" instead of "for instance."',
      line:          'Hyphenate "command-line."',
      manager:       'Use "Manager," capitalized, not "the manager."',
      number:        'Use "amount" to refer to things that can be measured. Use "number" to refer to things that can be counted as individual units.',
      variety:       'A variety of; use one.',
      means:         'by means of',
      event:         'in the event of',
      present:       'at present',
      point:         'at this point; replace with "now"',
      respect:       'with respect to',
      recommended:   'it is recommended that; use recommends',
      sure:          'be sure; use "make sure"',
      the:           'place the; replace "place" with "put"',
      than:          'different than',
      you:           'lets you',
      course:        'of course',
      describes:     '"this document describes ..."; Omit.',
      ui:            'TBD',
      up:            'Use "appears" instead of "shows up."',
      out:           'Use "see" instead of "check out."',
      time:          '"Real time" as a noun. "Real-time" as an adjective."',
      unable:        'Use "cannot" instead of "is unable to."',
    },
    hyphenChecks: {
      anti:   ' should generally not be hyphenated',
      auto:   ' should generally not be hyphenated',
      bi:     ' should generally not be hyphenated',
      multi:  ' should generally not be hyphenated',
      co:     ' should generally not be hyphenated',
      non:    ' should generally not be hyphenated',
      pre:    ' should generally not be hyphenated',
      re:     ' should generally not be hyphenated',
      sub:    ' should generally not be hyphenated',
      un:     ' should generally not be hyphenated',
    },
    pendingChecks: {
      branding:                            'usage/misusage of words like "Fauna\'s"',
      'Terminology of parts of Fauna ...':  'incorporate section',
      'Notes and cautions':                  'incorporate section',
      'Mechanics of Writing':                'incorporate style-related items',
      'The purpose of this document is':     'omit',
      'keep in mind':                        'condescending',
      'for this reason':                     'omit',
      'have the option to':                  'use "can"',
    },
    validTypes: {
      'all':    'ALL',
      'ALL':    'ALL',
      'error':  'ERROR',
      'ERROR':  'ERROR',
      'check':  'CHECK',
      'CHECK':  'CHECK',
    },
  }
}
var zConfig

if (!String.prototype.strip) {
  String.prototype.strip = function (string) {
    var escaped = string.replace(/([.*+\-?^=!:${}()|\[\]\/\\])/g, "\\$1")
    return this.replace(RegExp("^[" + escaped + "]+|[" + escaped + "]+$", "gm"), '')
  }
}

// setup
const setup = (myConfig, docPath) => {
  config = merge(config, myConfig, { arrayMerge: ovMerge })
  zConfig = config['gene_stylechecks.js']
}

// scan the lines in a file, but we just return the output
const scan = (lines, docFile) => {
  var results   = []
  var counter   = 0
  var inSource  = false
  var delimiter = ''
  var mg
  var prevWord  = ''

  debug.PREFIX = 'GS'

  if (!config.quick) return results

  lines.forEach((line) => {
    counter++

    debug.out(`${counter}: ${line}`)

    // identify source blocks
    if (!inSource && (line.match(/\[(source|shell)[^\]]*\]/))) {
      debug.out(`in source`)
      inSource = true
      return
    }

    // process source blocks
    if (inSource) {
      debug.out(`handling source block`)

      // handle Asciidoctor block delimiter
      if (mg = line.match(/^(-|=)+$/)) {
        debug.out(`matched a source delimiter`)
        if (delimiter.length > 0 && delimiter == mg[1]) {
          debug.out(`source ends`)
          delimiter = ''
          inSource = false
          return
        }

        if (delimiter == '') {
          debug.out(`no delimiter, so set to ${mg[1]}`)
          delimiter = mg[1]
          return
        }
      }

      // handle non-delimited blocks
      if (delimiter === '' && line.match(/^\s*$/)) {
        inSource = false
        return
      }

      // skip source block content
      return
    }

    // perform checks
    var words = line.split(/\s+/)
    var result = {
      line: counter,
      text: line,
      errors: [],
      warnings: [],
    }

    for (const candidate of words) {
      if (!candidate || candidate.length === 0) continue
      var word = candidate.strip('`*_()<>.,:|[]-#=!?/').toLowerCase()
      const formatted = chalk.bold(word.toUpperCase())
      if (zConfig.testWords.hasOwnProperty(word)) {
        const ruleType = zConfig.testWords[word]

        if (!ruleType.startsWith('Phrase')) {
          result.errors.push(
            `${error(ruleType)} ${formatted}: ${zConfig.testWordsRationale[word]}`
          )
        }
        else {
          if (zConfig.phraseWords.hasOwnProperty(word)) {
            if (prevWord === word) {
              result.errors.push(
                `${error(ruleType)} ${prevWord}: ${formatted} ${zConfig.testWordsRationale[word]}`
              )
            }
          }
        }
      }
      else {
        // other kinds of errors
        var hyphenated = word.split('-')[0]
        if (zConfig.hyphenChecks.hasOwnProperty(hyphenated)) {
          result.errors.push(
            `${error('Hyphenation')} ${formatted}: ${zConfig.hyphenChecks[word]}`
          )
        }

        if (word.endsWith(';')) {
          result.errors.push(
            `${error('Mechanics')} ${formatted}: Do not use semicolon; split into two sentences.`
          )
        }

        if (word.includes("'")) {
          result.warnings.push(
            `${warning('Mechanics')} ${formatted}: Do not use possessives, as in Fauna's; Contractions are acceptable.`
          )
        }

        if (word.includes('&')) {
          result.errors.push(
            `${error('Mechanics')} ${formatted}: Do not use "&" unless referring to a literal.`
          )
        }
      }
      prevWord = word
    }

    if (result.warnings.length > 0 || result.errors.length > 0) {
      results.push(result)
    }
  })

  return results
}

// provide a report for any results found
const report = (results) => {
  var emit = false
  if (Object.keys(results).length > 0) {
    Object.keys(results).map((docFile) => {
      results[docFile].map((entry) => {
        if (entry.errors.length > 0) {
          emit = true
        }
      })
    })
  }

  if (emit) {
    Object.keys(results).map((docFile) => {
      var output = chalk.magenta(docFile) + `\n`
      var hasErrors = false
      results[docFile].map((entry) => {
        output += `${chalk.cyan(entry.line)}: ${entry.text}\n`
        var spaces = " ".repeat(2 + entry.line.toString().length)
        if (entry.errors.length > 0) hasErrors = true
        entry.errors.map((error) => {
          output += `${spaces}- ${error}\n`
        })
        entry.warnings.map((error) => {
          output += `${spaces}- ${error}\n`
        })
      })
      if (hasErrors && output.length) console.log(output.trim())
    })
  }
}

// Demonstrate this check during direct execution
if (require.main === module) {
  setup({})
  results = scan([])
  report(results)
}

module.exports = { name: "Gene's style checks", scan, report, setup }
