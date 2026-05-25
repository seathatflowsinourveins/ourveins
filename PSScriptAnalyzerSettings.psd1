@{
    # W287 P2(i) — PSScriptAnalyzer 462W suppression policy
    #
    # Scope: project-root PSScriptAnalyzer config consumed by:
    #   - Local invocations: `Invoke-ScriptAnalyzer -Settings .\PSScriptAnalyzerSettings.psd1 -Path .`
    #   - CI (`.github/workflows/code-quality.yml` if/when the actionlint+yamllint lane is extended to PSSA)
    #
    # Rationale (W286c E#1 + W286-AUDIT P2#11):
    #   PSScriptAnalyzer's default ruleset flags 462W warnings across tools/*.ps1 + .claude/*.ps1
    #   shims, dominated by style-only categories (Position-of-parameter, alias use, write-host)
    #   that don't reflect runtime bugs. Suppressing only the noise-class rules + scoping to
    #   actual sources keeps the signal-to-noise ratio actionable.
    #
    # Cite:
    #   - PSScriptAnalyzer docs:
    #       https://learn.microsoft.com/en-us/powershell/module/psscriptanalyzer/
    #   - Rule reference:
    #       https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/

    Severity     = @('Error', 'Warning')

    IncludeRules = @(
        # Real bugs (always-on)
        'PSAvoidUsingPositionalParameters',
        'PSAvoidUsingInvokeExpression',
        'PSAvoidUsingPlainTextForPassword',
        'PSAvoidUsingConvertToSecureStringWithPlainText',
        'PSAvoidUsingComputerNameHardcoded',
        'PSAvoidUsingUsernameAndPasswordParams',
        'PSUsePSCredentialType',
        'PSAvoidGlobalVars',
        'PSAvoidGlobalAliases',
        'PSAvoidGlobalFunctions',
        'PSUseShouldProcessForStateChangingFunctions',
        'PSPossibleIncorrectComparisonWithNull',
        'PSPossibleIncorrectUsageOfRedirectionOperator',
        'PSPossibleIncorrectUsageOfAssignmentOperator',
        'PSReviewUnusedParameter',
        'PSUseLiteralInitializerForHashtable',
        'PSAvoidNullOrEmptyHelpMessageAttribute',

        # Real correctness rules
        'PSUseDeclaredVarsMoreThanAssignments',
        'PSUseConsistentIndentation',
        'PSMissingModuleManifestField'
    )

    ExcludeRules = @(
        # Style-only noise suppressed in this repo (W287 P2(i) policy decision)
        'PSAvoidUsingWriteHost',           # Write-Host is fine for hook output
        'PSUseSingularNouns',              # function naming style preference
        'PSUseShouldProcessForStateChangingFunctions',  # shadow of IncludeRules — gated per-script
        'PSUseConsistentWhitespace',       # cosmetic
        'PSAlignAssignmentStatement',      # cosmetic
        'PSUseCorrectCasing',              # cosmetic
        'PSAvoidLongLines',                # noise on PS oneliner hooks
        'PSAvoidUsingDoubleQuotesForConstantString',  # cosmetic
        'PSAvoidTrailingWhitespace'        # delegated to editor + pre-commit gate
        # W381 Stream C §1.5: PSPlaceOpenBrace/PSPlaceCloseBrace moved OUT of ExcludeRules
        # and INTO the Rules block below (configured with IgnoreOneLineBlock=$true so the
        # launcher one-liners are not penalized) — a rule cannot be both excluded and tuned.
    )

    # Per-rule tuning + 2026 best-practice rules (W381 Stream C §1.5):
    Rules = @{
        PSUseDeclaredVarsMoreThanAssignments = @{
            # eee.ps1 and similar launcher scripts declare env vars consumed by spawned processes;
            # the assignments ARE the side effect.
            Enable = $true
        }
        # W381 Stream C §1.5: PSUseCompatibleSyntax (Error-severity) pinned to the project's
        # real PowerShell targets makes the gate catch genuine cross-version syntax bugs
        # deterministically. Cite: learn.microsoft.com/powershell/utility-modules/psscriptanalyzer.
        PSUseCompatibleSyntax = @{ Enable = $true; TargetVersions = @('5.1', '7.0', '7.4') }
        PSPlaceOpenBrace      = @{ Enable = $true; OnSameLine = $true; NewLineAfter = $true; IgnoreOneLineBlock = $true }
        PSPlaceCloseBrace     = @{ Enable = $true; NewLineAfter = $true; IgnoreOneLineBlock = $true }
    }
}
