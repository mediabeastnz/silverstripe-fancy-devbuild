<?php

/**
 * Fancy Dev Build base class
 *
 * @package DevTasks
 *
 */
class DevTasks extends LeftAndMainExtension {
    public function init() {
        $tasks = array(
            'devbuild' => array(
                'title' => 'Dev/Build',
                'link' => 'dev/build',
                'reset_time' => '5000'
            )
        );

        $config_tasks = Config::inst()->get(__CLASS__, 'tasks');
        if (is_array($config_tasks)) {
            $tasks = array_merge($tasks, $config_tasks);
        }

        foreach ($tasks as $item => $values) {

            $attributes = array(
                'class' => 'devbuild-trigger',
                'data-title' => (isset($values['title']) ? $values['title'] : $item),
                'data-link' => $values['link'],
                'data-reset-time' => (isset($values['reset_time']) ? $values['reset_time'] : '5000')
            );

            // priority controls the ordering of the link in the stack. The
            // lower the number, the lower in the list
            $priority = -90;
            CMSMenu::add_link($item, '', '#', $priority, $attributes);
        }
    }
}
