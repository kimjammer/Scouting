<!-- 
Created by KimJammer

A custom componant to make big, resizeable buttons.
This is probably tech debt. If this needs to be fixed, I'm sorry.
Most of the css code is copy pasted from the attractions source code.
Use with width and length
-->
<script>
    import { createEventDispatcher } from "svelte";

    export let width;
    export let height;

    function ripple(node, options = {}) {
        // Default values.
        const props = {
            event: options.event || "click",
            transition: options.transition || 150,
            zIndex: options.zIndex || "100",
            bg: options.rippleColor || null,
            disabled: options.disabled || false,
        };

        const handler = (event) => rippler(event, node, props);

        if (!props.disabled) {
            node.addEventListener(props.event, handler);
        }

        function rippler(event, target, { bg, zIndex, transition }) {
            // Get border to avoid offsetting on ripple container position
            const targetBorder = parseInt(
                getComputedStyle(target).borderWidth.replace("px", "")
            );

            // Get necessary variables
            const rect = target.getBoundingClientRect(),
                left = rect.left,
                top = rect.top,
                width = target.offsetWidth,
                height = target.offsetHeight,
                dx = event.clientX - left,
                dy = event.clientY - top,
                maxX = Math.max(dx, width - dx),
                maxY = Math.max(dy, height - dy),
                style = window.getComputedStyle(target),
                radius = Math.sqrt(maxX * maxX + maxY * maxY),
                border = targetBorder > 0 ? targetBorder : 0;

            // Create the ripple and its container
            const ripple = document.createElement("div");
            const rippleContainer = document.createElement("div");
            rippleContainer.className = "ripple-container";
            ripple.className = "ripple";

            // Styles for the ripple
            ripple.style.marginTop = "0px";
            ripple.style.marginLeft = "0px";
            ripple.style.width = "1px";
            ripple.style.height = "1px";
            ripple.style.transition = `all ${transition}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            ripple.style.borderRadius = "50%";
            ripple.style.pointerEvents = "none";
            ripple.style.position = "relative";
            ripple.style.zIndex = zIndex;
            if (bg !== null) {
                ripple.style.backgroundColor = bg;
            }

            // Styles for the rippleContainer
            rippleContainer.style.position = "absolute";
            rippleContainer.style.left = 0 - border + "px";
            rippleContainer.style.top = 0 - border + "px";
            rippleContainer.style.height = "0";
            rippleContainer.style.width = "0";
            rippleContainer.style.pointerEvents = "none";
            rippleContainer.style.overflow = "hidden";

            // Store target position to change it after
            const storedTargetPosition =
                target.style.position.length > 0
                    ? target.style.position
                    : getComputedStyle(target).position;
            // Change target position to relative to guarantee ripples correct positioning
            if (
                storedTargetPosition !== "relative" &&
                storedTargetPosition !== "absolute"
            ) {
                target.style.position = "relative";
            }

            rippleContainer.appendChild(ripple);
            target.appendChild(rippleContainer);

            ripple.style.marginLeft = dx + "px";
            ripple.style.marginTop = dy + "px";

            rippleContainer.style.width = width + "px";
            rippleContainer.style.height = height + "px";
            rippleContainer.style.borderTopLeftRadius =
                style.borderTopLeftRadius;
            rippleContainer.style.borderTopRightRadius =
                style.borderTopRightRadius;
            rippleContainer.style.borderBottomLeftRadius =
                style.borderBottomLeftRadius;
            rippleContainer.style.borderBottomRightRadius =
                style.borderBottomRightRadius;
            rippleContainer.style.direction = "ltr";

            setTimeout(() => {
                ripple.style.width = radius * 2 + "px";
                ripple.style.height = radius * 2 + "px";
                ripple.style.marginLeft = dx - radius + "px";
                ripple.style.marginTop = dy - radius + "px";
            }, 0);

            function clearRipple() {
                setTimeout(() => {
                    ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
                }, 250);

                // Timeout set to get a smooth removal of the ripple
                setTimeout(() => {
                    rippleContainer.parentNode.removeChild(rippleContainer);
                }, transition + 250);

                // After removing event set position to target to it's original one
                // Timeout it's needed to avoid jerky effect of ripple jumping out parent target
                setTimeout(() => {
                    let clearPosition = true;
                    for (let i = 0; i < target.childNodes.length; i++) {
                        if (
                            target.childNodes[i].className ===
                            "ripple-container"
                        ) {
                            clearPosition = false;
                        }
                    }

                    if (clearPosition) {
                        if (storedTargetPosition !== "static") {
                            target.style.position = storedTargetPosition;
                        } else {
                            target.style.position = "";
                        }
                    }
                }, transition + 250);
            }

            clearRipple();
        }

        return {
            destroy() {
                node.removeEventListener(props.event, handler);
            },
            update(newProps = {}) {
                if (newProps.disabled) {
                    node.removeEventListener(props.event, handler);
                } else {
                    node.addEventListener(props.event, handler);
                }
            },
        };
    }

    function eventsAction(node, args) {
        if (args != null) {
            for (const event of args) {
                node.addEventListener(event.name, event.handler);
            }
        }

        return {
            destroy() {
                if (args != null) {
                    for (const event of args) {
                        node.removeEventListener(event.name, event.handler);
                    }
                }
            },
        };
    }

    export let events = [];

    const dispatch = createEventDispatcher();

  export let filled = false;
  export let outline = false;
  export let danger = false;
  export let neutral = false;
  export let round = false;
  export let rectangle = false;
  export let small = false;
  export let selected = false;
  export let noRipple = false;
  export let disabled = false;
</script>

<div
    class="card filled"
    disabled={disabled ? true : null}
    class:filled
    class:outline
    class:danger
    class:round
    class:neutral
    class:rectangle
    class:small
    class:selected
    on:click={e => dispatch('click', { nativeEvent: e })}
    use:ripple={{ disabled: noRipple || disabled }}
    use:eventsAction={events}
    style="--width: {width}; --height: {height};"
>
    <slot />
</div>

<style lang="scss">
    @use "sass:color";
    @use "sass:math";
    @use "node_modules/attractions/_variables" as vars;

    @mixin color-text-icon-ripple($color) {
        color: $color;

        .icon {
            stroke: $color;
        }

        .ripple {
            background: color.adjust($color, $alpha: -0.9);
        }
    }

    @mixin filled-interactive-background($color) {
        background: $color;
        background: linear-gradient(
            0deg,
            $color 0%,
            color.scale($color, $lightness: 10%) 100%
        );

        &:hover:not([disabled]) {
            background: color.scale($color, $lightness: 5%);
            background: linear-gradient(
                0deg,
                color.scale($color, $lightness: 5%) 0%,
                color.scale($color, $lightness: 15%) 100%
            );
        }

        &:focus:not([disabled]) {
            background: color.adjust($color, $lightness: 10%);
            background: linear-gradient(
                0deg,
                color.scale($color, $lightness: 10%) 0%,
                color.scale($color, $lightness: 20%) 100%
            );
        }
    }

    @mixin flat-interactive-background($color) {
        &,
        &.outline {
            &:hover:not([disabled]) {
                background: color.adjust($color, $alpha: -0.2);
            }

            &:focus:not([disabled]) {
                background: color.adjust($color, $alpha: -0.88);
            }
        }
    }

    .card {
        background-color: vars.$main;
        border-radius: vars.$card-radius;
        box-shadow: vars.$shadow-0;
        overflow: hidden;
        padding: 1.5em;
        user-select: none;
        width: calc(var(--width));
        height: calc(var(--height));

        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        display: flex;
        font-family: vars.$font;
        font-weight: vars.$button-font-weight;
        outline: none;

        &::-moz-focus-inner {
            border: 0;
        }

        &.no-padding {
            padding: 0;
        }

        &.outline {
            border: 1px solid color.adjust(vars.$main, $alpha: -0.7);
            box-shadow: none;
        }

        @include flat-interactive-background(vars.$main);

        :global {
            @include color-text-icon-ripple(vars.$background);
        }

        &.danger {
            @include flat-interactive-background(vars.$danger);

            :global {
                @include color-text-icon-ripple(vars.$danger);
            }
        }

        &.neutral {
            @include flat-interactive-background(vars.$dark);

            :global {
                @include color-text-icon-ripple(vars.$dark);
            }
        }

        &.filled {
            @include filled-interactive-background(vars.$main);

            box-shadow: vars.$shadow-1;

            &:hover:not([disabled]),
            &:focus:not([disabled]) {
                box-shadow: vars.$shadow-raised;
            }

            &.danger {
                @include filled-interactive-background(vars.$danger);
            }

            &.neutral {
                @include filled-interactive-background(vars.$dark);
            }

            :global {
                @include color-text-icon-ripple(vars.$main-text);
            }

            &[disabled] {
                background: vars.$disabled-bg;
                box-shadow: none;
            }
        }

        &.outline {
            border: 1px solid vars.$main;

            &.danger {
                border-color: vars.$danger;
            }

            &.neutral {
                border-color: vars.$dark;
            }

            &[disabled] {
                border-color: vars.$disabled-bg;
            }
        }

        &[disabled] {
            background: transparent;
            color: vars.$disabled;
            cursor: default;

            :global .icon {
                stroke: vars.$disabled;
            }
        }

        &.selected:not(.filled) {
            background: color.adjust(vars.$main, $alpha: -0.88);
        }
    }
</style>
